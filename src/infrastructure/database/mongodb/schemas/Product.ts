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
    default: 'published'
  },

  imported_t: {
    type: String,
    required: false,
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
    required: false,
    default: ''
  },
  quantity: {
    type: String,
    required: false,
    default: ''
  },
  brands: {
    type: String,
    required: false,
    default: ''
  },
  categories: {
    type: String,
    required: false,
    default: ''
  },
  labels: {
    type: String,
    required: false,
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
    required: false,
    default: ''
  },
  ingredients_text: {
    type: String,
    required: false,
    default: ''
  },
  traces: {
    type: String,
    required: false,
    default: ''
  },
  serving_size: {
    type: String,
    required: false,
    default: ''
  },
  serving_quantity: {
    type: Number,
    required: false,
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
    required: false,
    default: ''
  },
  image_url: {
    type: String,
    required: false,
    default: ''
  }
})

const Product = mongoose.model('product', productSchema)

export { Product }
