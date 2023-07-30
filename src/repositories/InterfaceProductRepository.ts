import { Product } from "../application/entities/Product";

export interface InterfaceProductRepository {
    save(data: Product): Promise<void>;
    getProducts(): Promise<Product[] | {}>
    // getProductByCode(code: string): Promise<Product | null>;
    deleteProductByCode(code: string): Promise<void>;
    // updateProducts(code: string): Promise<void>
}