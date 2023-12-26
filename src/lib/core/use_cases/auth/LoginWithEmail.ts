import type { IAuthRepository } from '$lib/core/repositories/IAuthRepository';

export class LoginWithEmail {
	constructor(private authRepository: IAuthRepository) {}
	async execute(email: string, password: string) {
		return this.authRepository.LoginWithEmailAndPassword(email, password);
	}
}
