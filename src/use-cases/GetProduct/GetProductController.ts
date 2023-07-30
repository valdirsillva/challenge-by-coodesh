import { Request, Response } from "express";
import { GetProductUseCase } from "./GetProductUseCase";

export class GetProductController {
    constructor(private getProductUseCase: GetProductUseCase) { }

    async handle(_: Request, response: Response) {
        try {
            const products = await this.getProductUseCase.execute()
            return response.status(200).json({
                products: products
            })

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }

}