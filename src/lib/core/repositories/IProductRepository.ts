import { Product } from '../entities/Product';

export interface IProductRepository {
    getAllProducts(): Promise<Product[]>;
}