const { Category } = require('../db/schemas/category-schema');
const { Product } = require('../db/schemas/product-schema');
const sampleProducts = require('../db/data/product.json');

/** 샘플데이터 초기화 & 생성 */
exports.resetProduct = async function () {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  return;
}

/** 샘플카테고리 초기화 & 생성 */
exports.resetCategory = async function () {
  await Category.deleteMany({});
  const 전체상품 = await Product.find({});
  let 카테고리목록 = 전체상품.map((item) => item.category).sort();
  카테고리목록 = new Set(카테고리목록);
  카테고리목록 = [...카테고리목록]
  const 카테고리배열 = [];
  카테고리목록.forEach((element, index) => {
    const obj = {};
    obj['name'] = element;
    카테고리배열.push(obj)
  });
  await Category.insertMany(카테고리배열);
  return;
}