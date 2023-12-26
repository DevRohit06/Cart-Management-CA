import type { Product } from "$lib/core/entities/Product";
import type { ICartRepository } from "$lib/core/repositories/ICartRepository";


export class GetAllCartProducts {
    constructor(private firebaseCartRepository: ICartRepository) { }

    async execute(): Promise<Product[]> {
        return await this.firebaseCartRepository.getAllCartProducts();
    }
}