import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Props =
  | {
      getItems?: (
        docToStart?: DocumentSnapshot<DocumentData> | null
      ) => Promise<{
        snapShot: QuerySnapshot<DocumentData>;
        lastVisible: DocumentSnapshot<DocumentData> | null;
      }>;

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
      idToPass: string;
      getItems?: never;
    };

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

    const { snapShot, lastVisible } = props.idToPass
      ? await getItemsWithId!(props.idToPass, lastItem)
      : await getItems!(lastItem);
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

  return {
    items,
    hasMore,
    loadItems,
    lastItemRef,
  };
}

export default useInfiniteLoading;
