let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    console.log("Products:", data); // DEBUG

    const container = document.getElementById("products");

    if (!container) {
      console.log("No products div found");
      return;
    }

    container.innerHTML = ""; // clear

    data.forEach(p => {
      const div = document.createElement("div");

      div.innerHTML = `
      <img src="${p.image}" width="150"><br>
        <h3>${p.name} - ${p.size}</h3>
        <p>₹${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>
          Add to Cart
        </button>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error:", err));

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}