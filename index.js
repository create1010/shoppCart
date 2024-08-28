let clickCart = document.querySelector(".buyIcon");
let cartList = document.querySelector(".cart");
let closeBtn = document.querySelector(".close");
let counts = document.querySelector(".amount");

clickCart.addEventListener("click", () => {
    if (cartList.style.right == "-100%") {
        cartList.style.right = "0";
    } else {
        cartList.style.right = "-100%";
    }
});
closeBtn.addEventListener("click", () => {
    cartList.style.right = "-100%";
});

let product = null;
let buyList = [];
//取json檔
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        product = data;
        showProduct()
    })
//商品渲染
function showProduct() {
    let productList = document.querySelector('.listProduct');
    productList.innerHTML = '';
    if (productList != null) {
        product.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">${product.price}</div>
                <button onclick="buy(${product.id})">直接購買</button>
            `;
            productList.appendChild(newProduct)
        });
    }
}

function buy(productID){
    let thisProduct = product.find(product=>product.id===productID);
    //商品不在購物車清單中
    if(!buyList[productID]){
        //無重複情況下顯示預設
        buyList[productID]=thisProduct;
        buyList[productID].count=1;
    }else{
        //重複則加數量
        buyList[productID].count++;
    }
    addCart();
}
function    addCart(){
    //加入購物車
    let listCart = document.querySelector('.listCart');
    listCart.innerHTML=''
    let totalCount = 0;
        buyList.forEach(product=>{
            if(product){
                let newProduct =document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML=`
                    <img src="${product.image}" alt="${product.name}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">${product.price}</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeAmount(${product.id},'-')">-</button>
                        <span class="count">${product.count}</span>
                        <button onclick="changeAmount(${product.id},'+')">+</button>
                    </div>
                `;
                listCart.appendChild(newProduct);
                totalCount+=product.count
            }
        })
        counts.innerText=totalCount;
        //過濾null及undefind的值
        let filterProductList = buyList.filter(product=>product!=null || product!=undefined);
        //儲存至bowser
        localStorage.setItem('filterProductList',JSON.stringify(filterProductList));
}

function changeAmount(productID,$type){
    switch ($type){
        case "-":
            buyList[productID].count--;
        break;
        case "+":
            buyList[productID].count++;
        break;
    }
    if(buyList[productID].count<=0){
        delete buyList[productID];
    }
    addCart();
}