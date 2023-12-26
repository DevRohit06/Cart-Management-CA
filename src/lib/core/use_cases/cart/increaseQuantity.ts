import type { FirebaseCartRepository } from '$lib/core/adapters/FirebaseCartRepository';

export class IncreaseQuantity {
	constructor(private repository: FirebaseCartRepository) {}
	async execute(productId: string) {
		await this.repository.IncreaseQuantity(productId);
	}
}
