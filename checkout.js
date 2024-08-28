let selectValue = [];
//load十載入localStorage並抓取
addEventListener('DOMContentLoaded',()=>{
    selectValue=JSON.parse(localStorage.getItem('filterProductList')) || {}
    console.log(selectValue);
    //渲染所選商品資訊
    showCartItem();
})
function showCartItem(){
    let checkItem = document.querySelector('.returnCheck .allList');
    let totalCountHTML = document.querySelector('.totalCount');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalCount = 0; //初始數量0
    let totalPrice = 0; //初始價格0

    checkItem.innerHTML='';
    selectValue.forEach(product=>{
        if(selectValue){
            let selectProduct =document.createElement('div');
            selectProduct.classList.add('item');
            selectProduct.innerHTML=`
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">${product.price}</div>
                    </div>
                    <div class="count">${product.count}</div>
                    <div class="returnPrice">${product.price * product.count}</div>
            `;
            checkItem.appendChild(selectProduct);
            totalCount+=product.count;
            totalPrice+=(product.price * product.count);
        }
    })
    totalCountHTML.innerText='共'+totalCount+'件';
    totalPriceHTML.innerText='$'+totalPrice;
}