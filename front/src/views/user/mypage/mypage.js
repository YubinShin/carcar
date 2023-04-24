const setUserData = (selector, text) => {
    document.querySelector(selector).textContent = text;
};

fetch('userData.json')
    .then((response) => response.json())
    .then((data) => {
        const userData = data[0];
        setUserData('.user_name', userData.name);
        setUserData('.user_email', userData.email);
        setUserData('.user_phone_number', userData.phoneNumber);
        setUserData(
            '.user_address',
            `${userData.address.postalCode} ${userData.address.addressMain} ${userData.address.addressDetail}`
        );
    })
    .catch((error) => console.log(error));

const setOrderListData = (selector, text) => {
    document.querySelector(selector).textContent = text;
};

fetch('orderList.json')
    .then((response) => response.json())
    .then((data) => {
        const orderList = data[0];
        setOrderListData('.order_date', orderList.createdAt);
        setOrderListData('.order_number', orderList.order_id);
        setOrderListData('.product_img', orderList.ordered_product[0].image);
        setOrderListData('.product_category', orderList.ordered_product[0]._id);
        setOrderListData(
            '.product_name',
            orderList.ordered_product[0].product_id
        );
        setOrderListData(
            '.product_amount',
            orderList.ordered_product[0].amount
        );
        setOrderListData('.payment_amount', orderList.total_price);
        setOrderListData('.payment_status', orderList.shipping_status);
    });
