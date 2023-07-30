import { Request, Response } from "express";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

export class DeleteProductController {
    constructor(private deleteProductController: DeleteProductUseCase,) { }

    async handle(request: Request, response: Response) {
        const code = request.params.code
        try {
            const data = await this.deleteProductController.execute(code)
            return response.status(201).json(data)
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }
}