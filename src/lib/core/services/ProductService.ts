import { ProductRepository } from "../adapters/ProductRepository";
import { ProductStore } from "../stores/productStore";
import { FetchProductsUseCase } from "../use_cases/products/Fetchproduct";

const productRepository = new ProductRepository();
const fetchProductsUseCase = new FetchProductsUseCase(productRepository);

export const updateProductToStore = async() => {
    const products = await fetchProductsUseCase.execute();
    ProductStore.set(products);
}
