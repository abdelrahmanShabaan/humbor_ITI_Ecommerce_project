//=========== Get All Elemenets From page Html ========
let title = document.getElementById("title");
let price = document.getElementById("price");
let category = document.getElementById("category");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let chooseFile = document.getElementById("myChooseImage");
let submit = document.getElementById("submit");
let description = document.getElementById("description");
let Qty = document.getElementById("Qty");




// ------------- variable for change value of input from create to Update -------------
let mood = "create";

let tmp;

// ------------- get total -------------
function getTotal() {
  if (price.value !== "") {
    var result = (+price.value - +discount.value) * +Qty.value;

    total.innerHTML = result;

    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = " #02226e";
  }
}

// ------------- create product on LocalStorage -------------
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}

//------------- Btn Click -------------
submit.onclick = function () {
  let productItem = {
    title: title.value.toLowerCase(),
    price: price.value,
    discount: discount.value,
    Qty: Qty.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    description: description.value,
    image: chooseFile.files[0].name,
  };

  //vaildation
  if (
    title.value != "" &&
    price.value != "" &&
    Qty.value != "" &&
    category.value != "" &&
    discount.value < price.value
  ) {
    if (mood === "create") {
      productData.push(productItem);
    } else {
      productData[tmp] = productItem;
      mood = "create";
      submit.innerHTML = "Create";
    }
  } else {
    alert("pleas enter all product");
  }
  localStorage.setItem("product", JSON.stringify(productData));
  clearInp();
  showData();
};

// ------------- Clear Data From Input -------------
function clearInp() {
  // productID.value = "";
  title.value = "";
  price.value = "";
  discount.value = "";
  Qty.value = "";
  category.value = "";
  total.innerHTML = "";
  description.value = "";
}

// ------------- Show Data -------------
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
            <tr>
               <td> ${i + 1} </td>
               <td> ${productData[i].title} </td>
               <td> ${productData[i].price} </td>
               <td> ${productData[i].discount} </td>
               <td> ${productData[i].Qty} </td>
               <td> ${productData[i].total} </td>
               <td> <img src="./images/${
                 productData[i].image
               }" alt="..." width="50" height="50" /> </td>
               <td> ${productData[i].category} </td>
              <td>  ${productData[i].description} </td>
               <td> <button onclick = "updateData(${i})" id="btnUpdate"> Update </button> </td>
               <td> <button onclick= "deleteData(${i})" id="btnDelete"> Delete </button> </td>
            </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteDiv = document.querySelector(".deletePro");
  if (productData.length > 0) {
    deleteDiv.innerHTML = `<button onclick = "deleteAll()" class="delete" > Delete All( ${productData.length} ) </button>`;
  } else {
    deleteDiv.innerHTML = "";
  }
}
showData();


//-------------  Show DeleteAll -------------
// ------------- Delete Product  -------------
function deleteData(i) {
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);

  
  let product = JSON.parse(localStorage.getItem("cartItems")).filter(
    (el) => el.id !== i
  );
  localStorage.cartItems = JSON.stringify(product);

  let productCount =
    parseInt(JSON.parse(localStorage.getItem("itemCounter"))) - 1;
  localStorage.itemCounter = JSON.stringify(productCount);

  showData();
}


//------------- Delete All Product -------------
function deleteAll() {
  localStorage.clear();
  productData.splice(0);

  showData();
}

//------------- Update Data -------------
function updateData(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  discount.value = productData[i].discount;
  Qty.value = productData[i].Qty;
  description.value = productData[i].description;
  getTotal();
  category.value = productData[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;

  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
}

//-------------  Search Mood  -------------
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "search by title") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

//------------- search -------------
function searchData(value) {
  let table = "";

  if (searchMood == "title") { 
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value)) {
        table += `
                     <tr>
                        <td> ${i} </td>
                        <td> ${productData[i].title} </td>
                        <td> ${productData[i].price} </td>
                        <td id="description"> ${productData[i].discount} </td>
                         <td> ${productData[i].Qty} </td>
                        <td> ${productData[i].total} </td>
                 
                        <td> <img src="./images/${productData[i].image}" alt="..."  width="50" height="50"/> </td>
                        <td> ${productData[i].category} </td>
                         <td> ${productData[i].description} </td>
                        <td> <button onclick = "updateData(${i})" id="btnUpdate">  Update </button> </td>
                        <td> <button onclick= "deleteData(${i})" id="btnDelete"> Delete </button> </td>
                     </tr>
                  `;
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value.toLowerCase())) {
        console.log(productData[i].image);

        table += `
                     <tr>
                 
                        <td> ${i} </td>
                        <td> ${productData[i].title} </td>
                        <td> ${productData[i].price} </td>
                        <td> ${productData[i].discount} </td>
                        <td> ${productData[i].Qty} </td>
                        <td> ${productData[i].total} </td>
                        <td> <img src="./images/${productData[i].image}" alt="..." width="50" height="50"/> </td>
                        <td> ${productData[i].category} </td>
                        <td> ${productData[i].description} </td>
                        <td> <button onclick = "updateData(${i})" id="btnUpdate">  Update </button> </td>
                        <td> <button onclick= "deleteData(${i})" id="btnDelete"> Delete </button> </td>
                     </tr>
                  `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
