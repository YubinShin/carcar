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
      {
        product_id: '3',
        amount: 4,
        image: 'http://via.placeholder.com/640x360',
        total_price: 100000,
        brand: '상품의 브랜드',
        name: '상품의 이름',
        desc: '상품의 설명',
      },
    ],
    shipping_status: '배송 전',

    postal: '우편번호',
    address: '유저의 주소',
    detailaddress: '유저의 상세주소',
    total_price: '780000',
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

    const postal = document.querySelector('#postal');
    postal.value = data[0].postal;

    const address = document.querySelector('#address');
    address.value = data[0].address;

    const detailaddress = document.querySelector('#detailaddress');
    detailaddress.value = data[0].detailaddress;

    const contact = document.querySelector('#contact');
    contact.innerHTML = data[0].contact;

    const orderList = function orderList(i) {
      return `
   
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

    const btn = document.querySelector('#changeAddress');

    btn.addEventListener('click', function () {
      if (data[0].shipping_status == '배송 전') {
        postal.value = postal.value;
        address.value = address.value;
        detailaddress.value = detailaddress.value;
        console.log(postal.value);
        console.log(address.value);
        console.log(detailaddress.value);

        fetch('http://34.22.74.213:5000/api/orders/:id', {
          method: 'PUT',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ3Y2IxYjFhZTZhMDkyNWVkYWJmZjYiLCJyb2xlIjoiYmFzaWMtdXNlciIsImlhdCI6MTY4MjQ4NjM2MX0.tJYowY4OfoYn-86GEAreez2u0fV5QHU5FhGL6Hbvf7E',

            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: {
              postalCode: postal.value,
              addressMain: address.value,
              addressDetail: detailaddress.value,
            },
          }),
        }).then(response => console.log(response));
      }
    });

    const priceText = document.querySelector('.priceBox-category_text');
    priceText.innerHTML = `상품금액 ${addCommas(data[0].total_price)} + 배송비 3,000 = 합계 : ${addCommas(
      Number(data[0].total_price) + 3000,
    )}`;

    const delBtn = document.querySelector('#orderDelete-btn');
    delBtn.addEventListener('click', delorder);

    function delorder() {
      const id = data[0].order_id;
      const url = `http://34.22.74.213:5000/api/orders/${id}`; //  ${req.param('id')

      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ3Y2IxYjFhZTZhMDkyNWVkYWJmZjYiLCJyb2xlIjoiYmFzaWMtdXNlciIsImlhdCI6MTY4MjQ4NjM2MX0.tJYowY4OfoYn-86GEAreez2u0fV5QHU5FhGL6Hbvf7E',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('DELETE request successful');
        })
        .catch(error => {
          console.error('There was a problem with the DELETE request:', error);
        });
    }
  });

// for (let item = 0; item < data.length; item++) {
//   let list = data[item];
//   for (let i = 0; i < list.ordered_product.length; i++) {
//     (list.ordered_product[i].name)

//   }
// }
