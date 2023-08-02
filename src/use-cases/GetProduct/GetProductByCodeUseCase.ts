import { InterfaceProductRepository } from "../../repositories/InterfaceProductRepository";

export class GetProductByCodeUseCase {
    constructor(private productRepository: InterfaceProductRepository,) { }
    async execute(code: string) {
        return await this.productRepository.getProductByCode(code)
    }
}