import type { Product } from "../entities/Product";
import type { ICartRepository } from "../repositories/ICartRepository";

export class CartRepository implements ICartRepository {
    getAllProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    addProduct(product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    removeProduct(product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    clearCart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}