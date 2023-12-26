import type { IAuthRepository } from '$lib/core/repositories/IAuthRepository';

export class CreateUserWithEmail {
	constructor(private AuthRepository: IAuthRepository) {}

	async execute(email: string, password: string, name: string) {
		return this.AuthRepository.RegisterWithEmailAndPassword(email, password, name);
	}
}
