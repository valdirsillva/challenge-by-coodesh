import { Request, Response } from "express";
import { GetProductByCodeUseCase } from "./GetProductByCodeUseCase";

export class GetProductByCodeController {
    constructor(private getProductByCodeUseCase: GetProductByCodeUseCase,) { }

    async handle(request: Request, response: Response) {
        const code = request.params.code
        try {
            const product = await this.getProductByCodeUseCase.execute(code)
            return response.status(200).json({ product })

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }
}