const { Router } = require('express');
const { Category } = require('../db/schemas/category-schema');
const { Product } = require('../db/schemas/product-schema');
const router = Router();

router.get('/', async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    /** 쿼리 스트링으로 카테고리를 입력한 경우 
     * 현재 카테고리 [BENZ, BMW, PORSCHE, LAMBORGHINI, FERRARI, AUDI, LAND, ROVER]
    */
    const 카테고리 = await Product.find(req.query);
    res.json(카테고리);
    return;
  }
  /** /product 만 입력한 경우 */
  const 상품 = await Product.find({});
  res.json(상품)
});

/** 상품의 상세페이지로 이동*/
router.get('/:id', async (req, res) => {
  const 상품고유번호 = req.params.id;
  const 상품 = await Product.find({ product_id: 상품고유번호 });
  res.json(상품)
});

module.exports = router;
