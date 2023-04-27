const addCommas = n => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

fetch('http://34.22.74.213:5000/api/orders', {
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRhMDJlM2MyZDFmNzgxYzVlZDIyMTEiLCJyb2xlIjoiYmFzaWMtdXNlciIsImlhdCI6MTY4MjU3MjAxNX0.agEmrfu5zsTVuak8eHxs4nOF-5w9iLQC2tibDwzZkNE',
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const orderList = function orderList(item, i) {
      return `
          <div class=listBox>
          <div class="orderList_product_order domain ">
          <p class="orderList_category_order_date">${data[item].createdAt}</p>
          <p class="orderList_category_order_number"><a href="#">${data[0].order_id}</a></p>
      </div>
      <div class="orderList_product_info">
        <div class="orderList_product_info_image">
            <img src=${data[item].ordered_product[0].image}/>
        </div>
        <div class="orderList_product_info_text">
            <div class="orderList_product_info_name">${data[item].ordered_product[0].name} 포함 ${
        Object.keys(data[item].ordered_product).length
      }종</div>
    </div>
      </div>
      <div class="orderList_product_price domain">${addCommas(data[item].total_price)}</div>
      <div class="orderList_product_state domain">${data[item].shipping_status}</div>
          </div>
      `;
    };
    const orderList_product = document.querySelector('.orderList_product');
    for (let item = 0; item < data.length; item++) {
      let list = data[item];
      orderList_product.insertAdjacentHTML('beforeEnd', orderList(item));
    }

    const link = document.querySelectorAll('.orderList_category_order_number');

    console.log(link);
    for (let i = 0; i < link.length; i++) {
      link[i].addEventListener('click', sendlink);
    }

    function sendlink() {
      console.log(1);
    }
  });
