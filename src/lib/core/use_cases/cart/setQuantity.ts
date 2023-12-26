import type { ICartRepository } from '../../repositories/ICartRepository';


export class setQuantity {
    constructor(private firebaseCartRepository: ICartRepository) { }

    async execute(productId: string, quantity: number): Promise<void> {
        const product = await this.firebaseCartRepository.getProductById(productId);

        if (product) {
            await this.firebaseCartRepository.setQuantity(productId, quantity);
        }
    }
}