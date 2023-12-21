import { CartRepository } from "../adapters/CartRepository";
import type { Product } from "../entities/Product";


const cartRepository = new CartRepository()

export const addProductToCart = async (product: Product) => {
    await cartRepository.addProduct(product)
}

export const removeProductFromCart = async (product: Product) => {
    await cartRepository.removeProduct(product)
}
