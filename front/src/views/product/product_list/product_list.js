import { addCommas } from '../../useful-function.js';

const categoryName = document.getElementById("page_name_text");
const productList = document.getElementById("product_list_area");

let productData = [];  // 상품데이터 배열로 받아오기

fetch("http://34.22.74.213:5000/api/product?categories=bmw", { credential: false })
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
