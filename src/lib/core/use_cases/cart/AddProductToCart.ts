import type { Product } from "$lib/core/entities/Product";
import type { ICartRepository } from "$lib/core/repositories/ICartRepository";


export class AddProductToCart {
    constructor(private FirebaseCartRepository: ICartRepository) {}
    async execute(productItem: Product) {
        await this.FirebaseCartRepository.addProduct(productItem);
    }
}