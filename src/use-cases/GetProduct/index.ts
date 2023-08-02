
import { GetProductController } from "./GetProductController";
import { GetProductUseCase } from "./GetProductUseCase";
import { MongoProductRepositoryImplementation } from "../../repositories/implementations/MongoProductRepositoryImplementation";
import { GetProductByCodeUseCase } from "./GetProductByCodeUseCase";
import { GetProductByCodeController } from "./GetProductByCodeController";

const mongoRepository = new MongoProductRepositoryImplementation()

const getProductUseCase = new GetProductUseCase(mongoRepository)

const getProductController = new GetProductController(getProductUseCase)

const getProductByCodeUseCase = new GetProductByCodeUseCase(mongoRepository)

const getProductByCodeController = new GetProductByCodeController(getProductByCodeUseCase)

export { getProductController, getProductByCodeController }