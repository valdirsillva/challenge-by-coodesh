import mongoose from "mongoose";
import { Database } from "../mongoose.service";
const InstanceDatabase = () => Database._connect()
const ImportedProductHistoricSchema = new mongoose.Schema({
    imported_at: {
        type: Date,
        default: Date.now,
    },
})

const ProductHistoric = mongoose.model('product_historic_imported', ImportedProductHistoricSchema)

export { ProductHistoric }