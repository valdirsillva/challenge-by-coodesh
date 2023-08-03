import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { getClient } from "../../interfaces/elasticsearch/elasticsearch";

// Liskov-Substition Principe
export class CreateProductControler {
    constructor(private createProductUseCase: CreateProductUseCase,) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body
        try {
            await this.createProductUseCase.execute(data)

            for await(let row of data ) {
                getClient().index({
                    index: 'products',
                    type: 'type_products',
                    body: row
                }, (err) => {
                    if(err) {
                        return response.status(400).json({ error: err })
                    }
                })
            }

            return response.status(201).send()

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }
}