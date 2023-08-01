import { Router } from 'express'
import { createProductController } from '../../use-cases/CreateProduct';
import { getProductController } from '../../use-cases/GetProduct';
import { deleteProductController } from '../../use-cases/DeleteProduct';

const router = Router()

router.post('/api/add', (request, response) => {
    return createProductController.handle(request, response)
})

router.get('/api/products', (request, response) => {
    return getProductController.handle(request, response);
})

router.delete('/api/products/:code', (request, response) => {
    return deleteProductController.handle(request, response)
})

export { router }

