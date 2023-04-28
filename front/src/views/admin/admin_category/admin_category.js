import { addCommas } from '../../useful-function.js';

const categoryName = document.getElementById("page_name_text");
const productList = document.getElementById("product_list_area");

let productData = [];  // 상품데이터 배열로 받아오기

fetch("http://34.22.74.213:5000/api/admin/category", { credential: false })
    .then(res => {
        return res.json();
    })
    .then((json) => {
        productData = json;
        console.log(productData);

        document.querySelector('#category_title').innerHTML = productData[0].category;
        
        productData.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.className = 'product_list_item';
            // const productLink = document.createElement('a');
            const productImageArea = document.createElement('div');
            productImageArea.className = 'item_img';
            const productImage = document.createElement('img');
            const productTextArea = document.createElement('div');
            productTextArea.className = 'item_text';
            const productName = document.createElement('p');
            productName.className = 'list_name';
            const productDescription = document.createElement('p');
            productDescription.className = 'list_sub';
            const productPrice = document.createElement('p');
            productPrice.className = 'list_price';
            
            // productLink.href += '/' + product.product_id;
            productImage.src += product.image;
            productName.innerHTML += product.name;
            productDescription.innerHTML += product.description;
            productPrice.innerHTML += "KRW " + addCommas(product.price);
            
            productList.appendChild(productElement);
            productElement.append(productImageArea, productTextArea);
            productImageArea.appendChild(productImage);
            productTextArea.append(productName, productDescription, productPrice);
            
            console.log(productList);
        })
    })
    .catch((error) => console.error(error));


const getCategory = function (response) {
    content.innerHTML = "";
    const categoryList = document.createElement("div");
    console.log(response.data);
    response.data.forEach((data) => {
      console.log("data");
      const categoryItem = document.createElement("div");
      const categoryName = document.createElement("h3");
      categoryName.innerHTML = data.name;
      categoryItem.appendChild(categoryName);
      categoryItem.classList.add("already");
      categoryList.appendChild(categoryItem);
    });
    categoryList.classList.add("category-list");
    content.appendChild(categoryList);
    // 폼 요소 생성
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "http://localhost:8080/admin/category");
    // 입력 필드 생성
    const input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("name", "name");
    input1.setAttribute("placeholder", "새카테고리");
    form.appendChild(input1);
    
    const input3 = document.createElement("input");
    input3.setAttribute("type", "submit");
    input3.setAttribute("value", "Submit");
    form.appendChild(input3);
    // 폼 요소를 문서에 추가
    content.classList.add("category-tab");
    content.appendChild(form);
  };