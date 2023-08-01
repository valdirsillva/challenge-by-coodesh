import { Product } from "../../application/entities/Product";
import { InterfaceProductRepository } from "../InterfaceProductRepository";
import { Product as Mongo } from "../../infrastructure/database/mongodb/schemas/Product"

export class MongoProductRepositoryImplementation implements InterfaceProductRepository {

    async save(data: Product) {
        try {
            const dataset = data.props;
            const raw = await Mongo.insertMany(Object.values(dataset))
            console.log(`${raw.length} documents inserted with successes!`)
        } catch (err) {
            console.log(err)
        }
    }

    async getProductByCode(code: string): Promise<{} | null> {
        try {
            const product = await Mongo.findById({ code: code })
            return product;
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    async getProducts(): Promise<Product[] | {}> {
        try {
            const products = await Mongo.find()
            return products;
        } catch (err) {
            console.log(err)
            return {
                message: 'Failed to list products'
            }
        }
    }

    async deleteProductByCode(code: string): Promise<void> {
        try {
            await Mongo.updateOne({ code: code }, { $set: { status: 'trash' } })
        } catch (err) {
            console.log(err)
        }
    }

    async updateProducts(code: string): Promise<void> {

    }
}