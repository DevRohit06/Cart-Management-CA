import type { Product } from '$lib/core/entities/Product';
import type { ICartRepository } from '$lib/core/repositories/ICartRepository';

export class RemoveProductFromCart {
	constructor(private FirebaseCartRepository: ICartRepository) {}
	async execute(productId: string) {
		await this.FirebaseCartRepository.removeProduct(productId);
	}
}
