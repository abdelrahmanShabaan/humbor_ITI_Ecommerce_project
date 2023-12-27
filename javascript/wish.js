let IDRef = parseInt(localStorage.getItem("cartItemID"));
let allProducts = localStorage.getItem("product");
let productParent = document.getElementById("Products");

if (localStorage.product != null) {
  allProducts = JSON.parse(localStorage.product);
} else {
  allProducts = [];
}

/* Herefunction that show product of cart have wishlist has added  */
function showProductsCart() {
  let products = JSON.parse(localStorage.getItem("cartItems"));
  products.map((item) => {
    productParent.innerHTML += `
    <tr>
      <td> <img src="./images/${item.image}" alt="..." width="100" id="tableImage"/> </td>
      <td>  <h3> ${item.title}  </h3> </td>
      <td>  <p> ${item.price}  </p> </td>
      <td>  <p> ${item.Qty}   </p> </td>
      <td>  <p> ${item.description}  </p> </td>
   
    </tr>
  `;
  });
}
