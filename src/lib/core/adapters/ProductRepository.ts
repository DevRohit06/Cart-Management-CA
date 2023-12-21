import axios from 'axios';
import type { IProductRepository } from '../repositories/IProductRepository';
import { Product } from '../entities/Product';

export class ProductRepository implements IProductRepository {
    private apiClient = axios.create({
        baseURL: 'https://fakestoreapi.com',
    });

    async getAllProducts() {
        const response = await this.apiClient.get('/products');
        return response.data.map((product: any) => new Product(product.id, product.title, product.price, product.description, product.category, product.image));
    }
}