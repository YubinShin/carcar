const { Schema } = require('mongoose');

const ProductSchema = new Schema({
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  maker: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true, collection: "Product" });

exports.Product = mongoose.model("Product", ProductSchema);