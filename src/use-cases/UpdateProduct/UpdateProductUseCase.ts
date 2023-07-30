import { Product } from "../../application/entities/Product";
import { ICreateProductRequestDTO } from "../CreateProduct/CreateProductDTO";
import { InterfaceProductRepository } from "../../repositories/InterfaceProductRepository"

export class UpdateProdutUseCase {
    constructor(private productRepository: InterfaceProductRepository) { }

    async execute(data: ICreateProductRequestDTO) {
        const product = new Product(data);

        // await this.productRepository.updateProducts(product)
    }
}