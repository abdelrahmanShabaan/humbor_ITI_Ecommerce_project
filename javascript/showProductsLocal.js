let allProducts = localStorage.getItem("product");

if (localStorage.product != null) {
  allProducts = JSON.parse(localStorage.product);
} else {
  allProducts = [];
}


// ------------- put input for object in array -------------
allProducts.forEach((element, index) => {
  element.id = index;
});



// ------------- show Products in Other Html Page -------------
let productDiv = document.querySelector(".container");

function showAllProducts() {
  for (let i = 0; i < allProducts.length; i++) {
    productDiv.innerHTML += `
      <div class="image">
        <div id="productId" style="display: none "> ${i + 1}  </div>
        <div class="topSectionCart">
        <div class="discount"> Discount: ${allProducts[i].discount}.EG </span> </div>
        <div> <a href="wishlist.html" class="wishList"> &#9825; </a> </div>
        </div>
        <img src="./images/${allProducts[i].image}" alt="product Image" width="100"/>
        <h3>${allProducts[i].title} </h3>
        <h3>${allProducts[i].price}.EG </h3>
        <div class="mark">
        <span> &#11088; </span>
        <span> &#11088; </span>
        <span> &#11088; </span>
        <span> &#11088; </span>
        <span> &#11088; </span>
        </div>
        <button class="add-cart cart1" onClick="icrementCounter(${i})"> Add Cart </button>
        <input type="hidden" value="50" />
      </div>
    `;
  }
}
showAllProducts();

// ------------- icrement  Product Counter  -------------
let counter = document.getElementById("cart-Counter");
// ------------- set  count of items in cart-Counter from localstorage -------------
counter.innerHTML = parseInt(JSON.parse(localStorage.getItem("itemCount"))) || 0;
// ------------- check if localStorage store itemCount => 0 or No( make value 0 ) -------------
let itemCount = JSON.parse(localStorage.getItem("itemCount")) || 0;


// ------------- check if localStorage store productData => [] or No ( make value [] ) -------------
let productData = JSON.parse(localStorage.getItem("cartItems")) || [];

// ------------- Function increment of items -------------
function icrementCounter(id) {
  if ( !productData.some((item) => item.id === id)  ) {
      productData.push(allProducts[id]);
      counter.innerHTML = parseInt(counter.innerHTML) + 1;
    } 
  localStorage.setItem("cartItems", JSON.stringify(productData));
}










