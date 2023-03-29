import {
  DocumentData,
  DocumentSnapshot,
  QueryFieldFilterConstraint,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Props =
  | {
      getItems?: (
        docToStart?: DocumentSnapshot<DocumentData> | null,
        optionalWheres?: QueryFieldFilterConstraint[]
      ) => Promise<{
        snapShot: QuerySnapshot<DocumentData>;
        lastVisible: DocumentSnapshot<DocumentData> | null;
      }>;

      optionalWheres?: QueryFieldFilterConstraint[];

      idToPass?: never;
      getItemsWithId?: never;
    }
  | {
      getItemsWithId: (
        id: string,
        docToStart?: DocumentSnapshot<DocumentData> | null
      ) => Promise<{
        snapShot: QuerySnapshot<DocumentData>;
        lastVisible: DocumentSnapshot<DocumentData> | null;
      }>;

      optionalWheres?: QueryFieldFilterConstraint[];

      idToPass: string;
      getItems?: never;
    };

interface InfiniteLoading {
  items: any[];
  hasMore: boolean;
  loadItems: () => Promise<DocumentSnapshot<DocumentData>[]>;
  lastItemRef: (node: any) => void;
  resetItems: () => void;
}

function useInfiniteLoading(props: Props) {
  const { getItems, getItemsWithId } = props;

  const [items, setItems] = useState<any[]>([]);
  const [lastItem, setLastItem] =
    useState<DocumentSnapshot<DocumentData> | null>(null);
  const initialPageLoaded = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems();
    initialPageLoaded.current = true;
  }, []);

  // TODO - Mejorar manera de mostrar que se esta cargando
  // TODO - Tener una manera de mostrar algo cuando ya no hay mas items
  async function loadItems(): Promise<DocumentSnapshot<DocumentData>[]> {
    if (!hasMore || isLoading) {
      return items;
    }
    setIsLoading(true);

    console.log('lastItem', lastItem?.data())
    const { snapShot, lastVisible } = props.idToPass
      ? await getItemsWithId!(props.idToPass, lastItem)
      : await getItems!(lastItem, props.optionalWheres);
    setHasMore(lastVisible != null);

    const data = snapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setItems((prevItems) => [...prevItems, ...data]);
    setLastItem(lastVisible);
    setIsLoading(false);

    return items;
  }

  async function resetItems() {
    setItems([]);
    setLastItem(null);
    setHasMore(true);
    await loadItems();
  }

  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (item: any) => {
      if (isLoading) return;

      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasMore) {
          loadItems();
        }
      });

      if (item) intersectionObserver.current.observe(item);
    },
    [isLoading, hasMore]
  );

  const value: InfiniteLoading = {
    items,
    hasMore,
    loadItems,
    lastItemRef,
    resetItems,
  }
  return value
}

export default useInfiniteLoading;
