//dependencies
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require("dotenv").config();

//라우터
const productRouter = require('./routers/product-router');
const adminRouter = require('./routers/admin-router');
const { resetProduct, resetCategory } = require('./middleware/product-reset');

//귀찮은 몽구스 메시지를 진정시킵니다.
//[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('runValidators', true);
mongoose.set('strictQuery', 'throw');
mongoose.set('strict', true);

//몽구스 연결
mongoose.connect(process.env.DB_URL, { dbName: 'eliceProject', useNewUrlParser: true });
mongoose.connection.on('connected', (err, client) => {
  console.log('MongoDB Connected');
});

const app = express();

// CORS 에러 방지
app.use(cors());
// 템플릿 엔진 없이 live-server로 html을 읽으려면 필요한 코드
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// FE분들께서 public 폴더에 css 등을 넣으시면 편리합니다.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// bodyParser 
// 클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// 라우터
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.get('/', async (req, res) => {
  await resetProduct();
  await resetCategory();
  res.send('홈페이지입니다.')
});

module.exports = { app };
