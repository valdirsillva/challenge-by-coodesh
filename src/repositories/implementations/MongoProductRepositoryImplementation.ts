import { Product } from "../../application/entities/Product";
import { getClient } from "../../interfaces/elasticsearch/elasticsearch";
import { InterfaceProductRepository } from "../InterfaceProductRepository";
import { Product as Mongo } from "../../infrastructure/database/mongodb/schemas/Product"
import { ProductHistoric } from "../../infrastructure/database/mongodb/schemas/HistoricImportedProducts"

export class MongoProductRepositoryImplementation implements InterfaceProductRepository {

    async save(data: Product) {
        try {
            const dataset = data.props;
            const raw = await Mongo.insertMany(Object.values(dataset))
            console.log(`${raw.length} documents inserted with success!`)

            const _historic = new ProductHistoric()
            _historic.save()
        } catch (err) {
            console.log(err)
        }
    }

    async getProductByCode(code: string): Promise<Product | {}> {
        try {
            // const product = await Mongo.findOne({ code })

            const { hits } = await getClient().search({
                index: 'products',
                body: {
                    query: {
                        term: {
                            code: {
                                value: parseInt(code)
                            }
                        }
                    }
                }
            })

            const product = hits.hits

            if (product.length > 0) {
                return product
            }
            return { success: false, error: "Product not found" }

        } catch (err) {
            console.error(err);
            return { success: false, error: "Product not found" }
        }
    }

    async getProducts(): Promise<Product[] | {}> {
        try {
            const products = await Mongo.find()
            return products
        } catch (err) {
            console.log(err)
            return {}
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