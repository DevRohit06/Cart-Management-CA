import type { ICartRepository } from '$lib/core/repositories/ICartRepository';

export class ClearCart {
	constructor(private FirebaseCartRepository: ICartRepository) {}

	async execute() {
		await this.FirebaseCartRepository.clearCart();
	}
}
