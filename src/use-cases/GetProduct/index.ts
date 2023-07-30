
import { GetProductController } from "./GetProductController";
import { GetProductUseCase } from "./GetProductUseCase";
import { MongoProductRepositoryImplementation } from "../../repositories/implementations/MongoProductRepositoryImplementation";

const mongoRepository = new MongoProductRepositoryImplementation()

const getProductUseCase = new GetProductUseCase(mongoRepository)

const getProductController = new GetProductController(getProductUseCase)

export { getProductController }