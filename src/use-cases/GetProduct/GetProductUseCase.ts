import { InterfaceProductRepository } from "../../repositories/InterfaceProductRepository";

export class GetProductUseCase {
    constructor(private productRepository: InterfaceProductRepository,) { }
    async execute() {
        return await this.productRepository.getProducts()
    }
}