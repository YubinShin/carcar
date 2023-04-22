import { addCommas } from '../../useful-function.js';

const DATA = [
  {
    user_id: '유저의 이름',
    ordered_product: [
      {
        product_id: '1',
        amount: 3,
        image: 'http://via.placeholder.com/640x360',
        total_price: 180000,
        brand: '상품의 브랜드',
        name: '상품의 이름',
        desc: '상품의 설명',
      },
      {
        product_id: '2',
        amount: 10,
        image: 'http://via.placeholder.com/640x360',
        total_price: 600000,
        brand: '상품의 브랜드',
        name: '상품의 이름',
        desc: '상품의 설명',
      },
      {
        product_id: '3',
        amount: 4,
        image: 'http://via.placeholder.com/640x360',
        total_price: 200000,
        brand: '상품의 브랜드',
        name: '상품의 이름',
        desc: '상품의 설명',
      },
    ],
    shipping_status: '배송준비중',
    address: '유저의 주소',
    total_price: 780000,
    order_id: '주문 조회 페이지에서의 클릭한 주문번호',
    createdAt: '2023-04-22',
    contact: '유저의 전화번호',
  },
];

// function loadItems() {
//   return fetch('').then(json => {
//     console.log(json);
//   });
// }

// loadItems().then(items => {
//   console.log(items);
// });

fetch('')
  .then(res => {
    return DATA;
  })
  .then(data => {
    console.log(data);
    console.log(data[0].ordered_product[0].amount);

    const orderNum = document.querySelector('#ordernumber');
    orderNum.innerHTML = data[0].order_id;

    const orderDate = document.querySelector('#orderdate');
    orderDate.innerHTML = data[0].createdAt;

    const customer = document.getElementsByClassName('customer');
    for (let i = 0; i < customer.length; i++) {
      customer[i].innerHTML = data[0].user_id;
    }

    const orderState = document.querySelector('#orderstate');
    orderState.innerHTML = data[0].shipping_status;

    const totalPrice = document.querySelector('#totalprice');
    totalPrice.innerHTML = addCommas(data[0].total_price);

    const address = document.querySelector('#address');
    address.innerHTML = data[0].address;

    const contact = document.querySelector('#contact');
    contact.innerHTML = data[0].contact;

    const orderList = function orderList(i) {
      return `
    <div class="orderProduct_category">
      <div class="orderProduct_category_column" style="width: 601px">
        <div>주문 상품정보</div>
      </div>
      <div class="orderProduct_category_column" style="width: 397px">
        <div class="orderProduct_category_column_list">수량</div>
        <div class="orderProduct_category_column_list">상품 구매금액</div>
        <div class="orderProduct_category_column_list">주문 처리상태</div>
      </div>
    </div>

    <div class="orderProduct_content">
      <div class="orderProduct_content_column">
        <div class="orderProduct_content_column_info">
          <div class="orderProduct_content_column_info_image">
            <img src="${data[0].ordered_product[i].image}" />
          </div>
          <div class="orderProduct_content_column_info_text">
            <div class="orderProduct_content_column_info_text_brand">${data[0].ordered_product[i].brand}</div>
            <div class="orderProduct_content_column_info_text_name">${data[0].ordered_product[i].name}</div>
            <div class="orderProduct_content_column_info_text_desc">${data[0].ordered_product[i].desc}</div>
          </div>
        </div>
      </div>
      <div class="orderProduct_content_column">
        <div class="orderProduct_content_column_statement">
          <div class="orderProduct_content_column_statement_list product_margin">${data[0].ordered_product[i].amount}</div>
          <div class="orderProduct_content_column_statement_list product_margin">${data[0].ordered_product[i].total_price}</div>
          <div class="orderProduct_content_column_statement_list product_margin">${data[0].shipping_status}</div>
        </div>
      </div>
    </div>
  `;
    };

    const orderProduct = document.querySelector('.orderProduct');
    for (let i = 0; i < data[0].ordered_product.length; i++) {
      orderProduct.insertAdjacentHTML('beforeEnd', orderList(i));
    }
  });
