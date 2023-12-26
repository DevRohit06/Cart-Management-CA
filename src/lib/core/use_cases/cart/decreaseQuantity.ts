import type { FirebaseCartRepository } from '$lib/core/adapters/FirebaseCartRepository';

export class DecreaseQuantity {
	constructor(private repository: FirebaseCartRepository) {}
	async execute(productId: string) {
		await this.repository.DecreaseQuantity(productId);
	}
}
