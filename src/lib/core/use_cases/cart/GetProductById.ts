import type { Product } from "$lib/core/entities/Product";
import type { ICartRepository } from "$lib/core/repositories/ICartRepository";

export class GetProductById {
    constructor(private productRepository: ICartRepository) {}

    async execute(productId: string) {
        return await this.productRepository.getProductById(productId);
    }
}