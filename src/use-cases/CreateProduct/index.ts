
import { CreateProductControler } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { MongoProductRepositoryImplementation } from "../../repositories/implementations/MongoProductRepositoryImplementation";

const mongoRepository = new MongoProductRepositoryImplementation()

const createProductUseCase = new CreateProductUseCase(mongoRepository)

const createProductController = new CreateProductControler(createProductUseCase)

export { createProductController }