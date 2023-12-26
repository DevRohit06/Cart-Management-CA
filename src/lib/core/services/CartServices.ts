import { FirebaseCartRepository } from '../adapters/FirebaseCartRepository';
import type { Product } from '../entities/Product';
import { LocalStorageRepository } from '../adapters/LocalStorageRepository';
import { AddProductToCart } from '../use_cases/cart/AddProductToCart';
import { RemoveProductFromCart } from '../use_cases/cart/RemoveProductFromCart';
import { ClearCart } from '../use_cases/cart/ClearCart';
import { GetAllCartProducts } from '../use_cases/cart/getAllCartProducts';
import { CartStore } from '../stores/CartStore';
import { AddCartToFirestore } from '../use_cases/cart/AddCartToFirestore';
import { setQuantity } from '../use_cases/cart/setQuantity';
import { IncreaseQuantity } from '../use_cases/cart/increaseQuantity';
import { GetProductById } from '../use_cases/cart/GetProductById';

let useFirebase: boolean = true;

const repository = new FirebaseCartRepository();
const AddProductToCartUseCase = new AddProductToCart(repository);
const RemoveProductFromCartUseCase = new RemoveProductFromCart(repository);
const ClearCartUseCase = new ClearCart(repository);
const getAllCartProductsUseCase = new GetAllCartProducts(repository);
const addCartToFirestoreUseCase = new AddCartToFirestore(repository);
const setQuantityUseCase = new setQuantity(repository);
const getProductsByIdUseCase = new GetProductById(repository);
const IncreaseQuantityUseCase = new IncreaseQuantity(repository);
const DecreaseQuantityUseCase = new IncreaseQuantity(repository);

export const getCartProducts = async () => {
	await getAllCartProductsUseCase.execute();
};

export const addProductToCart = async (product: Product) => {
	await AddProductToCartUseCase.execute(product);
	await RefreshCart();
};

export const addCartToFirestore = async () => {
	await addCartToFirestoreUseCase.execute();
};

export const removeProductFromCart = async (productId: string) => {
	await RemoveProductFromCartUseCase.execute(productId);
	await RefreshCart();
};

export const clearCart = async () => {
	await ClearCartUseCase.execute();
};

export const increaseQuantity = async (productId: string) => {
	await IncreaseQuantityUseCase.execute(productId);
	await RefreshCart();
};

export const decreaseQuantity = async (productId: string) => {
	await DecreaseQuantityUseCase.execute(productId);
	await RefreshCart();
};

export const RefreshCart = async () => {
	try {
		const products = await getAllCartProductsUseCase.execute();
		CartStore.set(products);
	} catch (error) {
		console.log(error);
	}
};
export const setQuantityCart = async (productId: string, quantity: number) => {
	await setQuantityUseCase.execute(productId, quantity);
	await RefreshCart();
};

export const getProductsById = async (productId: string) => {
	const products = await getProductsByIdUseCase.execute(productId);
	return products;
};
