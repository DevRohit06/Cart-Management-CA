import { getAuth } from 'firebase/auth';
import type { Product } from '../entities/Product';
import type { ICartRepository } from '../repositories/ICartRepository';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export class LocalStorageRepository implements ICartRepository {
	DecreaseQuantity(productId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	IncreaseQuantity(productId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	setQuantity(productId: string, quantity: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getProductsByUserId(): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}
	updateProduct(product: Product): Promise<void> {
		throw new Error('Method not implemented.');
	}

	getProductById(id: string): Promise<Product | undefined> {
		throw new Error('Method not implemented.');
	}

	key = 'cart';

	async _getCartProducts(): Promise<Product[]> {
		const products = localStorage.getItem(this.key);
		return products ? JSON.parse(products) : [];
	}

	async addProduct(product: Product): Promise<void> {
		try {
			const products = localStorage.getItem(this.key);
			if (products) {
				const productsArray = JSON.parse(products);
				productsArray.push(product);
				localStorage.setItem(this.key, JSON.stringify(productsArray));
			} else {
				localStorage.setItem(this.key, JSON.stringify([product]));
			}
		} catch (error) {
			console.log(error);
		}
	}

	async removeProduct(productId: string): Promise<void> {
		try {
			const products = localStorage.getItem(this.key);
			if (products) {
				const productsArray = JSON.parse(products);
				const updatedProductsArray = productsArray.filter((p: Product) => p.id !== productId);
				localStorage.setItem(this.key, JSON.stringify(updatedProductsArray));
			}
		} catch (error) {
			console.log(error);
		}
	}

	async clearCart(): Promise<void> {
		try {
			localStorage.removeItem(this.key);
		} catch (error) {
			console.log(error);
		}
	}

	async getAllCartProducts() {
		const products = localStorage.getItem(this.key);
		if (products) {
			return JSON.parse(products);
		}
		return [];
	}

	async addProductsToFirestore(): Promise<void> {
		const products = localStorage.getItem(this.key);
		if (products) {
			const productsArray = JSON.parse(products);
			await productsArray.map(async (product: Product) => {
				const docRef = doc(collection(db, 'cart'), `${product.id}`);
				await setDoc(docRef, { product }, { merge: true });
			});
		} else {
			return Promise.reject('No products in cart');
		}
	}

}
