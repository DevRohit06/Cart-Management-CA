import type { IProductRepository } from "../../repositories/IProductRepository.ts";

export class FetchProductsUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute() {
		return this.productRepository.getAllProducts();
	}
}
