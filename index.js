let clickCart = document.querySelector(".buyIcon");
let cartList = document.querySelector(".cart");
let closeBtn = document.querySelector(".close");
let counts = document.querySelector(".amount");

let product = null;
let buyList = [];

//頁面載入先抓bowser的資料
document.addEventListener('DOMContentLoaded',()=>{
    let saveUsertext=localStorage.getItem('filterProductList');
    let saveUserCount=localStorage.getItem('totalCount');
    if(saveUsertext){
        //解析json檔轉換回陣列
        buyList=JSON.parse(saveUsertext);
        addCart();
    }
    if(saveUserCount){
        //恢復購買數量並顯示
        counts.innerText=saveUserCount;
    }
})

clickCart.addEventListener("click", () => {
    if (cartList.style.right == "-100%" || cartList.style.right =='') {
        cartList.style.right = "0";
    } else {
        cartList.style.right = "-100%";
    }
});
closeBtn.addEventListener("click", () => {
    cartList.style.right = "-100%";
});

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
//條件判斷
function buy(productID){
    let thisProduct = product.find(product=>product.id===productID);
    let cartArray = buyList.find(item=>item.id===productID);
    //商品不在購物車清單中
    if(!cartArray){
        //無重複情況下顯示預設
        buyList.push(thisProduct)
        thisProduct.count=1;
    }else{
        //重複則加數量
        cartArray.count++;
    }
    addCart();
}
//加入購物車
function    addCart(){
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
        let filterProductList = buyList.filter(product=>product!==null && product!==undefined);
        //儲存至bowser
        localStorage.setItem('filterProductList',JSON.stringify(filterProductList));
        localStorage.setItem('totalCount',totalCount);
}
//+ or - function
function changeAmount(productID,$type){
    const selectThisProduct = buyList.findIndex(product=>product && product.id===productID)
        if(selectThisProduct!==-1){
            switch ($type){
                case "-":
                    buyList[selectThisProduct].count--;
                break;
                case "+":
                    buyList[selectThisProduct].count++;
                break;
            }
        }
        if(buyList[selectThisProduct].count<=0){
            buyList.splice(selectThisProduct,1)
        }
    addCart();
}