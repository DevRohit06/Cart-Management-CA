import type { Product } from "../entities/Product";

export interface ICartRepository {
    getAllProducts(): Promise<Product[]>;
    addProduct(product: Product): Promise<void>;
    removeProduct(product: Product): Promise<void>;
    clearCart(): Promise<void>;
}