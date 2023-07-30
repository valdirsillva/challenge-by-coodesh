import { DeleteProductUseCase } from "../DeleteProduct/DeleteProductUseCase";
import { DeleteProductController } from "../DeleteProduct/DeleteProductController";
import { MongoProductRepositoryImplementation } from "../../repositories/implementations/MongoProductRepositoryImplementation";

const mongoRepository = new MongoProductRepositoryImplementation()

const deleteProductUseCase = new DeleteProductUseCase(mongoRepository)

const deleteProductController = new DeleteProductController(deleteProductUseCase)

export { deleteProductController }