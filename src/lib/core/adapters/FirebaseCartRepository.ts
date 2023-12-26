import { auth, db } from '$lib/firebase';
import type { Product } from '../entities/Product';
import { get as getFromStore } from 'svelte/store';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	increment,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import type { ICartRepository } from '../repositories/ICartRepository';
import { userStore } from '../stores/authStore';

export class FirebaseCartRepository implements ICartRepository {
	private user = getFromStore(userStore);

	async IncreaseQuantity(productId: string): Promise<void> {
		const userRef = doc(collection(db, 'users'), this.user.uid || 'xyz');
		const cartRef = collection(userRef, 'cart');
		const productQuery = query(cartRef, where('id', '==', productId));
		const querySnapshot = await getDocs(productQuery);

		querySnapshot.forEach(async (docSnapshot) => {
			const productRef = docSnapshot.ref;
			await updateDoc(productRef, {
				quantity: increment(1)
			});
		});
	}

	async DecreaseQuantity(productId: string): Promise<void> {
		const userRef = doc(collection(db, 'users'), this.user.uid || 'xyz');
		const cartRef = collection(userRef, 'cart');
		const productQuery = query(cartRef, where('id', '==', productId));
		const querySnapshot = await getDocs(productQuery);
	  
		querySnapshot.forEach(async (docSnapshot) => {
		  const productRef = docSnapshot.ref;
		  const productData = docSnapshot.data();
		  const currentQuantity = productData.quantity || 0;
		  const newQuantity = Math.max(0, currentQuantity - 1);  // Ensure the quantity doesn't go below 0
	  
		  await updateDoc(productRef, {
			quantity: newQuantity
		  });
		});
	  }

	async getProductsByUserId(): Promise<Product[]> {
		try {
			const uid = this.user?.uid || '';
			const querySnapshot = await getDocs(query(collection(db, 'cart'), where('uid', '==', uid)));
			const products = querySnapshot.docs.map((doc) => {
				return doc.data() as Product;
			});
			return products;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
	async updateProduct(product: Product): Promise<void> {
		const userRef = doc(collection(db, 'users'), this.user.uid || 'xyz');
		const cartRef = collection(userRef, 'cart');
		const productQuery = query(cartRef, where('id', '==', product.id));
		const querySnapshot = await getDocs(productQuery);

		querySnapshot.forEach(async (docSnapshot) => {
			const productRef = docSnapshot.ref;
			await updateDoc(productRef, {
				...product
			});
		});
	}

	async getProductById(id: string): Promise<Product | undefined> {
		const userRef = doc(collection(db, 'users'), this.user.uid || 'xyz');
		const cartRef = collection(userRef, 'cart');
		const productQuery = query(cartRef, where('id', '==', id));
		const querySnapshot = await getDocs(productQuery);
		const cartItem = querySnapshot.docs[0];
		if (cartItem) {
			return cartItem.data() as Product;
		} else {
			return undefined;
		}
	}

	async _getCartProducts(): Promise<Product[]> {
		try {
			const userRef = doc(collection(db, 'users'), this.user?.uid || 'xyz');
			const cartCollectionRef = collection(userRef, 'cart');
			const querySnapshot = await getDocs(cartCollectionRef);
			const products = querySnapshot.docs.map((doc) => {
				return doc.data() as Product;
			});
			return products;
		} catch (error) {
			console.error('Error getting cart products:', error);
			return []; // Return an empty array in case of an error
		}
	}

	async addProduct(product: Product): Promise<void> {
		const userRef = doc(collection(db, 'users'), this.user.uid);
		const cartRef = doc(collection(userRef, 'cart'), `${product.id}`);

		const docSnapshot = await getDoc(cartRef);
		if (docSnapshot.exists()) {
			// If the product is already in the cart, increase its quantity
			await updateDoc(cartRef, {
				quantity: increment(1)
			});
		} else {
			// If the product is not in the cart, add it
			await setDoc(cartRef, {
				...product,
				quantity: 1,
				addedAt: serverTimestamp()
			});
		}
	}

	async removeProduct(productId: string): Promise<void> {
		try {
			const userRef = doc(collection(db, 'users'), this.user.uid);
			const cartRef = doc(collection(userRef, 'cart'), `${productId}`);
			await deleteDoc(cartRef);
		} catch (error) {
			console.log(error);
		}
	}

	async getAllCartProducts(): Promise<Product[]> {
		const products = await this._getCartProducts();
		return products;
	}

	async clearCart(): Promise<void> {
		try {
			const docRef = doc(db, 'cart');
			await deleteDoc(docRef);
		} catch (error) {
			console.log(error);
		}
	}

	async addProductsToFirestore(): Promise<void> {}

	async setQuantity(productId: string, quantity: number): Promise<void> {
		const userRef = doc(collection(db, 'users'), this.user.uid);
		const cartRef = doc(collection(userRef, 'cart'), `${productId}`);
		await updateDoc(cartRef, {
			quantity
		});
	}
}
