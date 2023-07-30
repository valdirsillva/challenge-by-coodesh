import mongoose from 'mongoose'
import { Database } from '../mongoose.service';

const InstanceDatabase = () => Database._connect()

InstanceDatabase()

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    default: ''
  },

  status: {
    type: String,
    enum: ['draft', 'trash', 'published'],

    required: true,
    default: ''
  },

  imported_t: {
    type: String,
    required: true,
    default: ''
  },

  creator: {
    type: String,
    required: true,
    default: ''
  },
  created_t: {
    type: Date,
    required: Date.now,
    default: ''
  },
  last_modified_t: {
    type: Number,
    required: false,
    default: ''
  },
  product_name: {
    type: String,
    required: true,
    default: ''
  },
  quantity: {
    type: String,
    required: true,
    default: ''
  },
  brands: {
    type: String,
    required: true,
    default: ''
  },
  categories: {
    type: String,
    required: true,
    default: ''
  },
  labels: {
    type: String,
    required: true,
    default: ''
  },
  cities: {
    type: String,
    required: false,
    default: ''
  },
  purchase_places: {
    type: String,
    required: false,
    default: ''
  },
  stores: {
    type: String,
    required: true,
    default: ''
  },
  ingredients_text: {
    type: String,
    required: true,
    default: ''
  },
  traces: {
    type: String,
    required: true,
    default: ''
  },
  serving_size: {
    type: String,
    required: true,
    default: ''
  },
  serving_quantity: {
    type: Number,
    required: true,
    default: ''
  },
  nutriscore_score: {
    type: Number,
    required: false,
    default: ''
  },

  nutriscore_grade: {
    type: String,
    required: false,
    default: ''
  },

  main_category: {
    type: String,
    required: true,
    default: ''
  },
  image_url: {
    type: String,
    required: true,
    default: ''
  }
})

const Product = mongoose.model('product', productSchema)

export { Product }
