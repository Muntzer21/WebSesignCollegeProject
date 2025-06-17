
/**
 * to take token from cookies
 * @returns {string|null} The token from cookies or null if not found.
 */
function getTokenFromCookies() {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? match[1] : null;
}

/**
 * on load get data from backend and display products
 */
window.onload = async function () {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(
      "http://localhost:3000/api/v1/product/get-products",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
          const products = await response.json();

    const productsRow = document.getElementById("products-row");
    productsRow.innerHTML = ""; // Clear existing
    productsRow.innerHTML = `<div class="container">
        <div class="text-center m-5">
            <h3>Products </h3>
        </div>
        <div class="row">`;

    products.forEach(product => {
     
      const card = document.createElement("div");
      card.className = "col-4 p-1";
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${
          product.images[0] || "https://via.placeholder.com/150"
        }" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.price}$</p>
          <a href="#" class="btn btn-warning" onclick="addItems('${
            product.product_id
          }',${product.price},'${product.title}')">Add</a>
        </div>
      </div>
    `;

      productsRow.appendChild(card);
    });
    
  } catch (error) {
    console.error("Failed to load products:", error);
  }
};


// Array to store order products
const orderProducts = [];


/**
 * Add items to the order
 * @param {*} productId product ID
 * @param {*} productPrice product price
 * @param {*} productTitle product title
 */
function addItems(productId, productPrice, productTitle) {
  // Check if product already exists in the order
  const existing = orderProducts.find((item) => item.product_id === productId);
  if (existing) {
    existing.product_quantity += 1;
  } else {
    console.log({
      product_id: productId,
      product_name: productTitle,
      product_unit_price: Number(productPrice),
      product_quantity: 1,
    });

    orderProducts.push({
      product_id: productId,
      product_name: productTitle,
      product_unit_price: Number(productPrice),
      product_quantity: 1,
    });
  }
  updateOrderDisplay();
}

/**
 * update the order display in the textarea
 * @returns {string} The order products as a string.
 */
function updateOrderDisplay() {
  const textarea = document.getElementById("textlong");
  if (!textarea) return;
  textarea.value = orderProducts
    .map(
      (item) =>
        `${item.product_name} x${item.product_quantity} ($${item.product_unit_price})`
    )
    .join("\n");
}

/**
 * Calculate the total price of the order
 */
function makeCheck() {
  const total = orderProducts.reduce(
    (sum, item) => sum + item.product_unit_price * item.product_quantity,
    0
  );
  document.getElementById("price").value = total.toFixed(2);
}

/**
 * this function resets the order information
 */
function resetinfo() {
  orderProducts.length = 0;
  updateOrderDisplay();
  document.getElementById("price").value = "";
}

/**
 * on click buy order request to backend
 * @param {*} event to info event
 * @returns create order
 */
async function buyOrder(event) {
  event.preventDefault();
  // orderProducts.forEach((item) => {console.log(orderProducts[0].product_id);
  
  // });
  console.log(orderProducts[0].product_id);
 console.log(orderProducts[0].product_quantity);
 console.log(orderProducts[0].product_unit_price);
 
  const token = getTokenFromCookies();

  
  if (!token) {
    alert("You are not logged in.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/v1/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shippingAddress: {
          phone: "07703139090",
          address: "egypt",
          city: "basra",
          postcode: "12345",
          state: "test",
          country: "iraq",
        },
        orderedProducts: [{
         id: orderProducts[0].product_id,
          product_quantity: orderProducts[0].product_quantity,
          product_unit_price: orderProducts[0].product_unit_price
        }],
      }),
    });
    console.log(response);
    

    if (response.ok) {
      alert("مشكور حب قلبي طلبك بطريق وشرفتنا ولله 😊🌺");
      orderProducts.length = 0;
      updateOrderDisplay();
      document.getElementById("price").value = "";
    } else {
      alert("Order failed. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}


