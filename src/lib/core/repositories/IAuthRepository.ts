export interface IAuthRepository {
	LoginWithEmailAndPassword(email: string, password: string): Promise<void>;
	Logout(): Promise<void>;
	RegisterWithEmailAndPassword(email: string, password: string, name: string): Promise<void>;
	LoginUsingGoogle(): Promise<void>;
	LoginUsingFacebook(): Promise<void>;
    checkAuth(): Promise<boolean>;
	getUser(): Promise<any>;
}
