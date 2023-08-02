import { Product } from "../../application/entities/Product";
import { InterfaceProductRepository } from "../InterfaceProductRepository";
import { Product as Mongo } from "../../infrastructure/database/mongodb/schemas/Product"
import { getClient } from "../../interfaces/elasticsearch/elasticsearch";

export class MongoProductRepositoryImplementation implements InterfaceProductRepository {

    async save(data: Product) {
        try {
            const dataset = data.props;

            const client = getClient()

            const result = await client.index({
                index: 'meu_indice',
                type: 'type_meu_indice',
                body: {
                    ...dataset
                }
            })

            console.log(result)

            const raw = await Mongo.insertMany(Object.values(dataset))
            console.log(`${raw.length} documents inserted with successes!`)
        } catch (err) {
            console.log(err)
        }
    }

    async getProductByCode(code: string): Promise<Product | {}> {
        try {
            const product = await Mongo.findOne({ code })
            return product ?? {};
        } catch (err) {
            console.log(err)
            return {}
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

    async updateProducts(code: string): Promise<void> { }
}