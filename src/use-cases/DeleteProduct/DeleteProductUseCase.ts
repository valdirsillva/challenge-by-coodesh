import { InterfaceProductRepository } from "../../repositories/InterfaceProductRepository";

export class DeleteProductUseCase {
    constructor(private productRepository: InterfaceProductRepository,) { }

    async execute(code: string) {
        return await this.productRepository.deleteProductByCode(code)
    }
}