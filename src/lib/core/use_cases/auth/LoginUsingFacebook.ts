import type { IAuthRepository } from '$lib/core/repositories/IAuthRepository';

export class LoginWithFacebook {
	constructor(private AuthRepository: IAuthRepository) {}
	async execute(): Promise<void> {
		await this.AuthRepository.LoginUsingFacebook();
	}
}
