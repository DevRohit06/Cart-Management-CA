import { collection, doc, setDoc } from "firebase/firestore";
import type { UserType } from "./core/entities/User";
import { db } from "./firebase";
import type { Product } from "./core/entities/Product";
import { userStore } from "./core/stores/authStore";
import { get } from "svelte/store";

// place files you want to import through the `$lib` alias in this folder.
export const saveUser = async (user: UserType, name?: string, cart?: Product[]) =>  {
    const docRef = doc(collection(db, 'user'), user.id);
    await setDoc(docRef, {
        id: user.id,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName || name,
        cartItem: user.cartItem
    });
}
