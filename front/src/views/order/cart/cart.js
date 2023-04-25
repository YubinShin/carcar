import { convertToNumber } from '../../useful-function.js';
import { addCommas } from '../../useful-function.js';

const DATA = [
  {
    user_id: '정민규',
    ordered_product: [
      {
        amount: 3,
        price: 60000,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: 'G90',
        desc: '좋은차',
      },
      {
        amount: 10,
        price: 40000,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: '소나타',
        desc: '좋은차',
      },
      {
        amount: 9,
        price: 500,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: 'G80',
        desc: '좋은차',
      },
      {
        amount: 1,
        price: 60000,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: '싼타페',
        desc: '좋은차',
        _id: '64423401a5cdc9fb12ec0042',
      },
    ],
  },
];

fetch('')
  .then(res => {
    return DATA;
  })
  .then(data => {
    const cart = function cart(i) {
      return `
      <div class=listBox>
      <div class="cart_product_order domain">
      <input type="checkbox" class="cart_category_listCheckbox">
      
  </div>
 
  <div class="cart_product_info">
      <div class="cart_product_info_image">
          <img src=${data[0].ordered_product[i].image}/>
      </div>
      <div class="cart_product_info_text">
          <div class="cart_product_info_brand">${data[0].ordered_product[i].brand}</div>
          <div class="cart_product_info_name">${data[0].ordered_product[i].name}</div>
          <div class="cart_product_info_desc">${data[0].ordered_product[i].desc}</div>
      </div>
     
  </div>
  
  <div class="cart_product_price domain">${addCommas(data[0].ordered_product[i].price)}
  </div>
  <div class="cart_product_amount domain">
       <div class="cart_product_amount_count">
          <button class="cart_product_amount_count_plus">+</button>
          <div class="product_amount">${data[0].ordered_product[i].amount}</div>
          <button class="cart_product_amount_count_minus">-</button>
      </div>
  <button class="cart_product_amount_change">변경</button>
  </div>
  
  <div class="cart_product_totalPrice domain">${addCommas(
    data[0].ordered_product[i].amount * data[0].ordered_product[i].price,
  )}
  </div>
`;
    };

    const cart_product = document.querySelector('.cart_product');

    for (let i = 0; i < data[0].ordered_product.length; i++) {
      cart_product.insertAdjacentHTML('beforeEnd', cart(i));
    }

    const plus = cart_product.querySelectorAll('.cart_product_amount_count_plus');

    for (let i = 0; i < plus.length; i++) {
      plus[i].addEventListener('click', plusAmount);

      function plusAmount(e) {
        const amount = plus[i].parentNode.querySelector('.product_amount');

        amount.innerHTML = Number(amount.innerHTML) + 1;
      }
    }

    const deleteBtn = document.querySelector('#deleteBtn');
    const check = document.querySelectorAll('.cart_category_listCheckbox');
    const allcheck = document.querySelector('#allCheck');
    const minus = document.querySelectorAll('.cart_product_amount_count_minus');
    const changeBtn = document.querySelectorAll('.cart_product_amount_change');
    const finalAmount = document.querySelector('.priceBox-price_totalPrice');
    let selectProductPrice = document.querySelector('.priceBox-price_selectPrice');

    let newPrice = 0;
    let beforePrice = 0;
    let subPrice = 0;
    let selectPrice = 0;
    allcheck.addEventListener('click', allCheckBox);

    for (let i = 0; i < minus.length; i++) {
      minus[i].addEventListener('click', minusAmount);
      function minusAmount(e) {
        const amount = minus[i].parentNode.querySelector('.product_amount');
        if (Number(amount.innerHTML) > 1) {
          amount.innerHTML = Number(amount.innerHTML) - 1;
        }
      }
    }

    for (let i = 0; i < check.length; i++) {
      check[i].addEventListener('click', function (e) {
        const selectedPrice = check[i].parentElement.parentElement.querySelector('.cart_product_totalPrice').innerHTML;

        priceCheck(selectedPrice, e);
      });
    }
    let totalPrice;
    function priceCheck(selectedPrice, e) {
      if (e.target.checked === true) {
        selectPrice += convertToNumber(selectedPrice) + subPrice;
        selectProductPrice.innerHTML = addCommas(selectPrice);
        totalPrice = addCommas(selectPrice);
        finalAmount.innerHTML = addCommas(selectPrice + 3000);
      } else if (e.target.checked === false) {
        let test = e.target.parentElement.parentElement.querySelector('.cart_product_totalPrice').innerHTML;
        newPrice = convertToNumber(document.querySelector('.priceBox-price_selectPrice').innerHTML);

        newPrice -= convertToNumber(test);

        selectProductPrice.innerHTML = addCommas(newPrice);
        finalAmount.innerHTML = newPrice + 3000;
        selectPrice = 0;
        subPrice = convertToNumber(addCommas(newPrice));
        console.log(subPrice);
      }
    }

    for (let i = 0; i < changeBtn.length; i++) {
      changeBtn[i].addEventListener('click', changeAmount);
      function changeAmount(e) {
        const ischecked = e.target.parentElement.parentElement.querySelector('.cart_category_listCheckbox');
        if (ischecked.checked === true) {
          const amount = e.target.parentNode.querySelector('.product_amount');
          const draftPrice = document.querySelector('.priceBox-price_selectPrice');
          const targetPrice = e.target.parentElement.parentElement.parentElement;
          let totalPrice = targetPrice.querySelectorAll('.cart_product_totalPrice');
          console.log(newPrice);

          beforePrice = convertToNumber(totalPrice[i].innerHTML);
          newPrice = data[0].ordered_product[i].price * parseInt(amount.innerHTML);
          totalPrice[i].innerHTML = newPrice;
          subPrice = newPrice - beforePrice;
          let draft = convertToNumber(draftPrice.innerHTML);

          draftPrice.innerHTML = addCommas(draft + subPrice);
          finalAmount.innerHTML = addCommas(Number(convertToNumber(draftPrice.innerHTML)) + 3000);
          selectPrice = 0;
        }
      }
    }
    console.log(newPrice);
    function allCheckBox() {
      check.forEach(items => {
        items.checked = allcheck.checked;
      });
      const checkedPrice = document.querySelectorAll('.cart_product_totalPrice');
      let sum = 0;
      for (let i = 0; i < checkedPrice.length; i++) {
        sum += convertToNumber(checkedPrice[i].innerHTML);
      }

      selectProductPrice.innerHTML = sum;
      finalAmount.innerHTML = sum + 3000;
    }

    deleteBtn.addEventListener('click', deleteList);

    function deleteList() {
      for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
          selectPrice = 0;
          let testselect = convertToNumber(
            check[i].parentNode.parentNode.querySelector('.cart_product_totalPrice').innerHTML,
          ); // 체크박스가 된 금액
          console.log(testselect);
          selectProductPrice.innerHTML = 0;
          finalAmount.innerHTML = 0;
          check[i].parentNode.parentNode.remove();
        } else if (check[i].checked === false) {
          // let delPrice = convertToNumber(selectProductPrice.innerHTML); // 하단 상품 총액 금액
          // let selectPrice = convertToNumber(
          // delPrice -= selectPrice;
        }
      }
    }
  });
