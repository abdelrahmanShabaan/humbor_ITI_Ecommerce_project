if (localStorage.pendingProducts != null) {
  productData = JSON.parse(localStorage.pendingProducts);
} else {
  productData = [];
}
// ----------------------------------------------------------
if (localStorage.confirmedProducts != null) {
  confirmedProduct = JSON.parse(localStorage.confirmedProducts);
} else {
  confirmedProduct = [];
}

// --------------------------   Show Items From Cart  --------------------------
function showOrderProducts() {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
            <tr>
               <td> <img src="./images/${productData[i].image}" alt="Air Pods" width="100"/>  </td>
               <td> ${productData[i].title} </td>
               <td> ${productData[i].category} </td>
               <td> ${productData[i].description} </td>
               <td> ${productData[i].price} </td>
               <td> <button onclick = "confirmFun(event, ${productData[i].id})" id="btnUpdate">  Confirm </button> </td>
               <td> <button onclick= "rejectFun(${i}, ${productData[i].id})" id="btnDelete"> Reject </button> </td>
            </tr>
         `;
  }
  document.getElementById("Products").innerHTML = table;
}
showOrderProducts();

// --------------------------  confirmFun    --------------------------
function confirmFun(e, id) {
  e.target.style.backgroundColor = "green";
  e.target.innerHTML = "Ok";
  let products = JSON.parse(localStorage.getItem("pendingProducts"));
  if (!confirmedProduct.some((el) => el.id === id)) {
    products.forEach((element) => {
      element.id === id ? confirmedProduct.push(element) : false;
    });
  }
  localStorage.confirmedProducts = JSON.stringify(confirmedProduct);
}
// ------------- confirmed show  ------------------
function confirmedShow() {
  let confrimedItemsID = confirmedProduct.map((el) => el.id);
  let btnsConfirm = document.querySelectorAll("#btnUpdate");
  if (confirmedProduct.length > 0) {
    productData.forEach((el, indexProduct) => {
      if (confrimedItemsID.includes(el.id)) {
        btnsConfirm.forEach((el, indexBtn) => {
          if (indexProduct == indexBtn) {
            el.style.backgroundColor = "green";
            el.innerHTML = "Ok";
          }
        });
      }
    });
  }
}
confirmedShow();

// -------------------------- Delete  Items From Cart  --------------------------
function rejectFun(i, id) {

  productData.splice(i, 1);
  localStorage.pendingProducts = JSON.stringify(productData);

  /*
  *When Delete Item Form PendingList it's 
   *Deleting From ConfirmedList  
   */

  let prod = JSON.parse(localStorage.getItem("confirmedProducts")).filter(
    (el) => el.id !== id
  );
  localStorage.confirmedProducts = JSON.stringify(prod);


  showOrderProducts();

  confirmedShow();

}
