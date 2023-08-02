import { Request, Response } from "express";
import { GetProductUseCase } from "./GetProductUseCase";

export class GetProductController {
    constructor(private getProductUseCase: GetProductUseCase) { }

    async handle(request: Request, response: Response) {
        const PRODUCTS_PER_PAGE = 7
        const page = parseInt(request.query.page as string) || 1

        try {
            const products = await this.getProductUseCase.execute()

            const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
            const endIndex = startIndex + PRODUCTS_PER_PAGE;

            const paginateProducts = Array.isArray(products) ? products.slice(startIndex, endIndex) : [];

            return response.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(paginateProducts.length / PRODUCTS_PER_PAGE),
                totalProducts: paginateProducts.length,
                products: paginateProducts,
            })

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }

}