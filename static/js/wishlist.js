let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("wishlist-count").innerText = wishlist.length;
document.getElementById("cart-count").innerText = cart.length;

let container = document.getElementById("wishlist-products");

function displayWishlist() {

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<p>No products in wishlist.</p>";
        document.getElementById("wishlist-count").innerText = 0;
        return;
    }

    wishlist.forEach((item, index) => {

        container.innerHTML += `
            <div class="image-box">
                <img src="${item.image}" width="150">
                <h3>${item.name}</h3>
                <p>${item.price}</p>

                 <button onclick="moveToCart(${index})">
            Move to Cart
        </button>

                <button onclick="removeFromWishlist(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("wishlist-count").innerText =
        wishlist.length;
}

function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();
}

displayWishlist();

function moveToCart(index) {

    let item = wishlist[index];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.some(product => product.name === item.name);

    if (!exists) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();
}