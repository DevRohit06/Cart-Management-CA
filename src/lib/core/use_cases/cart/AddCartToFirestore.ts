import type { Product } from "$lib/core/entities/Product";
import type { ICartRepository } from "$lib/core/repositories/ICartRepository";
import { auth } from "$lib/firebase";

export class AddCartToFirestore {
    constructor(private  FirebaseCartRepository: ICartRepository) {}

    public async execute(): Promise<void> {
        if (auth.currentUser) {
           if (this.FirebaseCartRepository) {
               await this.FirebaseCartRepository?.addProductsToFirestore();
           }
        }
    }
}