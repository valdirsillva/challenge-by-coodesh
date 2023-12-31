import { Router } from 'express'
import { createProductController } from '../../use-cases/CreateProduct';
import { deleteProductController } from '../../use-cases/DeleteProduct';
import { getProductByCodeController, getProductController } from '../../use-cases/GetProduct';
import { Database } from '../../infrastructure/database/mongodb/mongoose.service';

const router = Router()

function managerMemoryRam() {
    const usedMemory = process.memoryUsage();

    console.log('Memory usage (RSS):', formatBytes(usedMemory.rss));
    console.log('Heap total:', formatBytes(usedMemory.heapTotal));
    console.log('Heap used:', formatBytes(usedMemory.heapUsed));

    function formatBytes(bytes: any) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
    }
}

router.get("/", async (request, response) => {
    const status = Database.getConnectionStatus();

    console.log('-----------------------------')
    console.log('MONGODB STATUS:', status);
    console.log('-----------------------------')

    setInterval(() => {
        console.clear()
        managerMemoryRam()
    }, 2000)

    return response.status(200).json({
        status: status
    })
})

router.put('/products/add', (request, response) => {
    return createProductController.handle(request, response)
})

router.get('/products', (request, response) => {
    return getProductController.handle(request, response);
})

router.get('/products/:code', (request, response) => {
    return getProductByCodeController.handle(request, response)
})

router.delete('/products/delete/:code', (request, response) => {
    return deleteProductController.handle(request, response)
})

export { router }

