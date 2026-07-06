

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

window.onload = function () {
    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("wishlist-count").innerText = wishlist.length;
};

let container = document.getElementById("cart-products");

if (cart.length === 0) {
    container.innerHTML = "<h2>Your cart is empty</h2>";
} else {
    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="image-box">
                <img src="${item.image}" width="100">
                <h3>${item.name}</h3>
                <p>${item.price}</p>

                   <button onclick="moveToWishlist(${index})">
            Move to Wishlist
        </button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });
}

let total = 0;

cart.forEach(product => {
    total += Number(product.price);

    // Your existing code to create product card
});

document.getElementById("total-amount").textContent = total;


function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

function moveToWishlist(index) {

    let item = cart[index];

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let exists = wishlist.some(product => product.name === item.name);

    if (!exists) {
        wishlist.push(item);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

function buyNow(button) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        button.innerText = "Cart Empty";
        return;
    }

    button.innerText = "Order Placed";
    button.disabled = true;

    localStorage.removeItem("cart");
}