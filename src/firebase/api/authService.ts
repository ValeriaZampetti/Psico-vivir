import { UserCredential, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ClientCreate, DoctorCreate } from "../../interfaces/Client";
import { auth, googleAuthProvider, db, githubAuthProvider } from "../config";

export async function signIn(
  email: string,
  password: string
): Promise<UserCredential | null> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export function createUser(
  client: ClientCreate | DoctorCreate,
  password: string
): Promise<UserCredential | null> {
  const collectionRef = collection(db, "users");
  console.log("Creating user", client.email);
  return createUserWithEmailAndPassword(auth, client.email, password).then(
    (userCredential) => {
      const user = userCredential.user;

      const clientRef = doc(collectionRef, user.uid);

      setDoc(clientRef, {
        ...client,
        createdAt: serverTimestamp(),
      });
      console.log("User created", user.uid);
      return userCredential;
    }
  );
}

export async function logOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.log("error", error);
  }
}

export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: ClientCreate = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
        type: 1,
      };

      const clientRef = doc(collectionRef, result.user?.uid);
      setDoc(clientRef, client);
    }

    await auth.updateCurrentUser(result.user);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function signInWithGithub(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, githubAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: ClientCreate = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
        type: 1,
      };

      const clientRef = doc(collectionRef, result.user?.uid);
      setDoc(clientRef, client);
    }

    auth.updateCurrentUser(result.user);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
