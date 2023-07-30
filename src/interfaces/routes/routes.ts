
import path from 'path';
import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises';
import { FoodReadFileZip } from '../controllers/http/FoodReadFileZip'
import { FoodReadDataset } from '../controllers/http/FoodReadDataset'
import { createProductController } from '../../use-cases/CreateProduct';
import { getProductController } from '../../use-cases/GetProduct';
import { deleteProductController } from '../../use-cases/DeleteProduct';

const router = Router()
// MongooseService.main(mongoose)

router.post('/api/add', (request, response) => {
    return createProductController.handle(request, response)
})

router.get('/api/products', (request, response) => {
    return getProductController.handle(request, response);
})

router.delete('/api/products/:code', (request, response) => {
    return deleteProductController.handle(request, response)
})

router.get('/get', async (req, res) => {
    const filename = await FoodReadFileZip.get()

    const dataset = new FoodReadDataset()
    await dataset.downloadPackageZip(filename!)

    res.end()
})


router.get('/products', async (request, response) => {
    const arquivo = path.join(__dirname, "../controllers/http/json/product.json")
    const data = JSON.parse(await readFile(arquivo, "utf-8"))

    const products: any = []
    data.map((pro: any) => {
        while (products.length <= 100) {
            products.push({
                code: pro.code,
                url: pro.url,
                status: pro.status,
                imported_t: pro.imported_t,
                creator: pro.creator,
                created_at: pro.created_t,
                last_modified_t: pro.last_modified_t,
                product_name: pro.product_name,
                quantity: pro.quantity,
                brands: pro.brands,
                categories: pro.categories,
                labels: pro.labels,
                cities: pro.cities,
                purchase_places: pro.purchase_places,
                stores: pro.stores,
                ingredientsText: pro.ingredients_text,
                traces: pro.traces,
                serving_size: pro.serving_size,
                serving_quantity: pro.service_quantity,
                nutriscore_grade: pro.nutriscore_grade,
                main_category: pro.main_category,
                image_url: pro.image_url
            }
            );
        }
    })

    await writeFile('data.json', JSON.stringify(products))

    return response.send(products)
})

export { router }




