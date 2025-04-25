//localhost:3000/user/insertData
let products = [];
let pricei = 0;
  const text = document.getElementById("textlong"); // Get the value of the username input field price
  const price = document.getElementById("price"); // Get the value of the username input field price
http: function insertData(params) {
  // Fetch data from the server
  fetch("http://localhost:3000/user/insertData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the response data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function addItems(name, itemPrice) {
  products.push(name); // Add the product name to the array
  pricei += itemPrice; // Add the item price to the total price
}

function makeCheck() {


  products.forEach((product) => {
    text.value += product + " "; // Set the value of the username input field to the product name
    // console.log(product); // Log each product to the console
  }); 

    price.value = pricei+'$'; 

}

document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll("card-title");
  buyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      words += 10;

      arr.push(document.querySelectorAll("card-title").innerText); // Add the username input value to the array
      arr.push(words); // Add the username input value to the array
      // alert("Thank you for your choice : )");
    });
  });
});



function resetinfo() {
    alert("Thank you for your processing : )"); // Show an alert message
    products.forEach((product) => {
        products.pop(product); // Remove the product name from the array
    })
    pricei = 0; // Reset the total price to 0
    text.value = ""; // Clear the value of the username input field
    price.value = ""; // Clear the value of the username input field
}

async function test(e) {
  e.preventDefault();
  console.log(document.getElementById("username").value); // Log the username input value

  // document.writeln("test"); // Write "test" to the document
  fetch("http://localhost:3000/user/getTest").then(async (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json(); // Parse JSON from the response
    //   console.log(data); // Log the data to the console
    //   document.write(data.user); // Write the data to the document
    //   return response.json(); // Parse JSON from the response
    document.getElementById("out").textContent = data.user;
  });
}

