import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';
import { auth, db } from '$lib/firebase';
import type { IAuthRepository } from '../repositories/IAuthRepository';
import { goto } from '$app/navigation';
import { refreshUser } from '../services/AuthService';
import { RefreshCart } from '../services/CartServices';
import { get, get as getFromStore } from 'svelte/store';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { userStore } from '../stores/authStore';

export class AuthRepository implements IAuthRepository {
	private auth = auth;
	private user = getFromStore(userStore);

	async getUser(): Promise<any> {
		return this.user;
	}

	async checkAuth(): Promise<boolean> {
		return this.user ? true : false;
	}

	async LoginWithEmailAndPassword(email: string, password: string): Promise<void> {
		try {
		  await signInWithEmailAndPassword(this.auth, email, password).then(async (user) => {
			await getDoc(doc(db, 'users', user.user.uid)).then((docSnapshot) => {
			  if (docSnapshot.exists()) {
				const docData = docSnapshot.data();
				userStore.set({
				  uid: docData.uid,
				  email: docData.email,
				  photoURL: docData.photoURL || 'https://xsgames.co/randomusers/avatar.php?g=pixel',
				  displayName: docData.displayName || 'Default user'
				});
			  }
			})
			await goto('/');
		  });
		} catch (error: any) {
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  console.log(errorCode, errorMessage);
		}
	  }

	async Logout(): Promise<void> {
		try {
			await this.auth.signOut();

			userStore.set(null);
			await RefreshCart();
			await goto('/login');
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		}
	}

	async RegisterWithEmailAndPassword(email: string, password: string, name: string): Promise<void> {
		try {
			await createUserWithEmailAndPassword(this.auth, email, password).then(async (userData) => {
				const user = userData.user;
				const docRef = doc(collection(db, 'user'), user.uid);
				await setDoc(docRef, {
					id: user.uid,
					email: user.email,
					photoURL: user.photoURL || 'https://xsgames.co/randomusers/avatar.php?g=pixel',
					displayName: user.displayName || name || 'Default user'
				}).catch((error) => {
					console.error('Error writing document: ', error);
				});
				userStore.set({
					uid: user.uid,
					email: user.email,
					photoURL: user.photoURL || 'https://xsgames.co/randomusers/avatar.php?g=pixel',
					displayName: user.displayName || name || 'Default user'
				});
				await RefreshCart();
				await goto('/');
			});
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		}
	}

	async LoginUsingGoogle(): Promise<void> {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(this.auth, provider).then(async (userData) => {
				const user = userData.user;
				const docRef = doc(collection(db, 'users'), user.uid);
				await setDoc(docRef, {
					id: user.uid,
					email: user.email,
					photoURL: user.photoURL || 'https://xsgames.co/randomusers/avatar.php?g=pixel',
					displayName: user.displayName || 'Default user'
				}).catch((error) => {
					console.error('Error writing document: ', error);
				});
				userStore.set({
					uid: user.uid,
					email: user.email,
					photoURL: user.photoURL || 'https://xsgames.co/randomusers/avatar.php?g=pixel',
					displayName: user.displayName || 'Default user'
				});
				await RefreshCart();
				await goto('/');
			});
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		}
	}

	async LoginUsingFacebook(): Promise<void> {
		const provider = new FacebookAuthProvider();
		try {
			await signInWithPopup(this.auth, provider);
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		}
	}
}
