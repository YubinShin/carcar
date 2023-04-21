const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  }, {
  timestamps: true,
  collection: "Category"
});

exports.Category = mongoose.model("Category", CategorySchema);