const { Router } = require('express');
const { Category } = require('../db/schemas/category-schema');
const { Product } = require('../db/schemas/product-schema');
const router = Router();


router.get('/', async (req, res) => {
  /** /admin 만 입력한 경우 */
  const 상품 = await Product.find({});
  res.json('hi')
});

router.get('/category', async (req, res) => {
  console.log('카테고리요청')
  const 카테고리목록 = await Category.find({})
  res.json(카테고리목록)
});
router.get('/product', async (req, res) => {
  console.log('상품요청')
  const 상품목록 = await Product.find({})
  res.json(상품목록)
});
router.post('/category', async (req, res) => {
  console.log(req.body)
  // const { name } = req.body;
  const 새카테고리 = await new Category({ name: req.body.name.toUpperCase() })
  await 새카테고리.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('새카테고리 created successfully!');
    }
  });
  console.log(새카테고리)
  res.redirect('/admin/category')
});
router.post('/product', async (req, res) => {
  console.log('상품등록')
  console.log(req.body)
  res.json(req.body)
});
module.exports = router;
