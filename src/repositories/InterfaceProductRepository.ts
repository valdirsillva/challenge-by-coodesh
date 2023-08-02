import { Product } from "../application/entities/Product";

export interface InterfaceProductRepository {
    save(data: Product): Promise<void>;

    // Listar todos produtos da base de dados
    getProducts(): Promise<Product[] | {}>

    getProductByCode(code: string): Promise<Product | {}>;

    deleteProductByCode(code: string): Promise<void>;
    // updateProducts(code: string): Promise<void>
}