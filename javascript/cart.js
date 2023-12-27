if (localStorage.cartItems != null) {
  productData = JSON.parse(localStorage.cartItems);
} else {
  productData = [];
}

//-----------------   Show Items From Cart  -------------
function showProducts() {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
            <tr>
               <td> <img src="./images/${productData[i].image}" alt="Air Pods" width="100"/>  </td>
               <td> ${productData[i].title} </td>
               <td> ${productData[i].category} </td>
               <td> ${productData[i].description} </td>
               <td> ${productData[i].price} </td>
               <td> <button onclick = "waitingResponse(${productData[i].id}, event)" id="btnUpdate">  Order </button> </td>
               <td> <button onclick= "deleteData(${i}, ${productData[i].id})" id="btnDelete"> Delete </button> </td>
               <td> <button onclick= "payProduct(${i}, ${productData[i].id})" id="btnPay"> pay now </button></td>
            </tr>
         `;
  }
  
  document.getElementById("Products").innerHTML = table;
  
}
showProducts();

//-------------  set value of counter from localStorage  -------------
let counter = document.getElementById("cart-Counter");
localStorage.setItem(
  "itemCount",
  JSON.parse(localStorage.getItem("cartItems")).length 
);
counter.innerHTML =
  parseInt(JSON.parse(localStorage.getItem("itemCount"))) || 0;


//------------- Delete  Items From Cart  -------------
function deleteData(i, id) {
  // ------ Delete Item From Cart Page
  productData.splice(i, 1);
  localStorage.cartItems = JSON.stringify(productData);

  // ------ Delete Item From Pending Page -------------
  console.log(id);
  let pendingProduct = JSON.parse(
    localStorage.getItem("pendingProducts")
  ) || []
    pendingProduct.filter((el) => el.id !== id);
  localStorage.pendingProducts = JSON.stringify(pendingProduct);

  // ------ Delete Count Item From Cart-Counter -------------
  counter.innerHTML = parseInt(counter.innerHTML) - 1;
  localStorage.itemCount = JSON.stringify(counter.innerHTML);

  // ------ Show Products Again After Deleting -------------
  showProducts();

  stillLoading();
}

// -------------  Adding Items To Order List Page  -------------
if (localStorage.pendingProducts != null) {
  pendingItems = JSON.parse(localStorage.pendingProducts);
} else {
  pendingItems = [];
}
function waitingResponse(id, e) {
  if (!pendingItems.some((el) => el.id === id)) {
    productData.forEach((element) => {
      element.id === id ? pendingItems.push(element) : false;
    });
  }
  localStorage.setItem("pendingProducts", JSON.stringify(pendingItems));
  e.target.id = "spinner";
  e.target.innerHTML = "";
}

// -------------  Still Loadding    -------------
if (localStorage.confirmedProducts != null) {
  confirmedProduct = JSON.parse(localStorage.confirmedProducts);
} else {
  confirmedProduct = [];
}
function stillLoading() {
  let confrimedItemsID = confirmedProduct.map((el) => el.id);
  let btnsConfirm = document.querySelectorAll("#btnUpdate");
  if (confirmedProduct.length > 0) {
    productData.forEach((el, indexProduct) => {
      if (confrimedItemsID.includes(el.id)) {
        btnsConfirm.forEach((el, indexBtn) => {
          if (indexProduct == indexBtn) {
            el.style.backgroundColor = "green";
            el.innerHTML = "confirmed";
          }
        });
      } else {
        console.log(el);
        el.innerHTML = "";
      }
    });
  }
}
stillLoading();


 
function payProduct(i,id) {
  document.getElementById("btnPay").onclick = function () {
    location.href = "payment.html";
}
}

