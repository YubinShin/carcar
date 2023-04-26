import * as Api from '../../api.js';

addAllElements();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    insertUserData();
    insertLatestOrder();
}

const setUserData = (selector, text) => {
    document.querySelector(selector).textContent = text;
};

//사용자 정보 받아오기
async function insertUserData() {
    userData = await Api.get('http://34.22.74.213:5000/api/users/info');

    userData = {
        fullName,
        email,
        phoneNumber,
        address: {
            postalCode,
            addressMain,
            addressDetail,
        },
    };

    setUserData('.user_name', userData.fullname);
    setUserData('.user_email', userData.email);
    setUserData('.user_phone_number', userData.phoneNumber);
    setUserData(
        '.user_address',
        `${userData.address.postalCode} ${userData.address.addressMain} ${userData.address.addressDetail}`
    );
}

//최신 주문 정보 받아오기

const setOrderListData = (selector, text) => {
    document.querySelector(selector).textContent = text;
};

async function insertLatestOrder() {
    order = await Api.get('http://34.22.74.213:5000/api/orders');

    data = {
        createdAt,
        order_id,
        ordered_product: { product_id, amount, image, total_price, _id },
        shipping_status,
        total_price,
    };

    const orderList = data[0];
    setOrderListData('.order_date', orderList.createdAt);
    setOrderListData('.order_number', orderList.order_id);
    setOrderListData('.product_img', orderList.ordered_product[0].image);
    setOrderListData('.product_category', orderList.ordered_product[0]._id);
    setOrderListData('.product_name', orderList.ordered_product[0].product_id);
    setOrderListData('.product_amount', orderList.ordered_product[0].amount);
    setOrderListData('.payment_amount', orderList.total_price);
    setOrderListData('.payment_status', orderList.shipping_status);
}
