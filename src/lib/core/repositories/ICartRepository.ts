import type { Product } from '../entities/Product';

export interface ICartRepository {
	getAllCartProducts(): Promise<Product[]>;
	addProduct(product: Product): Promise<void>;
	removeProduct(productId: string): Promise<void>;
	clearCart(): Promise<void>;
    addProductsToFirestore(): Promise<void>;
    getProductById(id: string): Promise<Product | undefined>;
    updateProduct(product: Product): Promise<void>;
    getProductsByUserId(): Promise<Product[]>;
    setQuantity(productId: string, quantity: number): Promise<void>;
    IncreaseQuantity(productId: string): Promise<void>;
    DecreaseQuantity(productId: string): Promise<void>;
}
