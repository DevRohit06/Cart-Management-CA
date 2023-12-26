import type { IAuthRepository } from '$lib/core/repositories/IAuthRepository';

export class Logout {
	constructor(private authRepository: IAuthRepository) {}

	async execute(): Promise<void> {
		await this.authRepository.Logout();
	}
}
