
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
  