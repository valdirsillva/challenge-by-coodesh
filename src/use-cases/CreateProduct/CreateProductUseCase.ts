import { Product } from "../../application/entities/Product";
import { InterfaceProductRepository } from "../../repositories/InterfaceProductRepository"
import { ICreateProductRequestDTO } from "./CreateProductDTO";

export class CreateProductUseCase {
    constructor(private productRepository: InterfaceProductRepository) { }

    async execute(data: ICreateProductRequestDTO) {
        const product = new Product(data);

        await this.productRepository.save(product)
    }
}