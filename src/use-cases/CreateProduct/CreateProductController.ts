import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

// Liskov-Substition Principe
export class CreateProductControler {
    constructor(private createProductUseCase: CreateProductUseCase,) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body

        try {
            await this.createProductUseCase.execute({ ...data })

            return response.status(201).send()

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }
}