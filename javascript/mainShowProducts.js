let up = document.getElementById("up");
/*on scroll down  */
onscroll = function () {
  if (scrollY >= 500) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
};
//Here what the button will do when i click in


//We catch when product add to cart 
let carts = document.querySelectorAll(".add-cart");

//Here i make for loop when press in button add to cart {{Just for loop and length}}
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    console.log("done");
  });
}
