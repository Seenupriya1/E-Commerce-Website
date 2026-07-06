function openProfile() {
    document.getElementById("profileBox").style.display = "block";
}

function closeProfile() {
    document.getElementById("profileBox").style.display = "none";
}

function openLogin() {
    document.getElementById("profileBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

function closeLogin() {
    document.getElementById("loginBox").style.display = "none";
}

function openSignup() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "block";
}

function closeSignup() {
    document.getElementById("signupBox").style.display = "none";
}

function addToWishlist(heart) {

    let productBox = heart.closest(".image-box");

    let image = productBox.querySelector("img").src;
    let name = productBox.querySelector("figcaption").innerText;
    let price = productBox.querySelector(".price").innerText;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let exists = wishlist.some(item => item.name === name);

    if (exists) {

        wishlist = wishlist.filter(item => item.name !== name);

        heart.classList.remove("fa-solid", "added");
heart.classList.add("fa-regular");

    } else {

        let product = {
            image: image,
            name: name,
            price: price
        };

        wishlist.push(product);

       heart.classList.remove("fa-regular");
heart.classList.add("fa-solid", "added");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    document.getElementById("wishlist-count").innerText =
        wishlist.length;
}


function addToCart(button) {

    let productBox = button.closest(".image-box");

    let image = productBox.querySelector("img").src;
    let name = productBox.querySelector("figcaption").innerText;
    let price = parseInt(productBox.querySelector(".price").innerText.replace("₹", ""));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.some(item => item.name === name);

    if (exists) {

        // Remove from cart
        cart = cart.filter(item => item.name !== name);

        button.innerText = "Add to Cart";
        button.classList.remove("added");

    } else {

        // Add to cart
        cart.push({
            image: image,
            name: name,
            price: price
        });

        button.innerText = "Added";
        button.classList.add("added");
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cart-count").innerText = cart.length;
}



function searchProduct() {
    let search = document.getElementById("search-box").value.toLowerCase();


    if (search.includes("new born")) {
        window.location.href = "newborn.html";
    }
    else if (search.includes("baby girl")) {
        window.location.href = "babygirl.html";
    }
    else if (search.includes("baby boy")) {
        window.location.href = "babyboy.html";
    }
    else if (search.includes("t-shirts for women")) {
        window.location.href = "w t-shirts.html";
    }
    else if (search.includes("jeans for women")) {
        window.location.href = "w jeans.html";
    }
    else if (search.includes("tops")) {
        window.location.href = "tops.html";
    }
    else if (search.includes("skirts")) {
        window.location.href = "skirts.html";
    }
    else if (search.includes("ethnic wear")) {
        window.location.href = "ethnic wear.html";
    }
    else if (search.includes("t-shirts for men")) {
        window.location.href = "m t-shirts.html";
    }
    else if (search.includes("jeans for men")) {
        window.location.href = "m jeans.html";
    }
    else if (search.includes("shirts")) {
        window.location.href = "shirts.html";
    }
    else if (search.includes("pants")) {
        window.location.href = "pants.html";
    }
    else if (search.includes("caps")) {
        window.location.href = "caps.html";
    }
    else if (search.includes("bags")) {
        window.location.href = "bags.html";
    }
    else if (search.includes("watches")) {
        window.location.href = "watches.html";
    }
    else if (search.includes("sunglass")) {
        window.location.href = "sunglasses.html";
    }
    else {
        alert("Product not found");
    }
}


window.onload = function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlist-count").innerText =
        wishlist.length;

    document.querySelectorAll(".image-box").forEach(productBox => {

        let name = productBox.querySelector("figcaption").innerText;

        // Cart button state
        let button = productBox.querySelector(".add-cart");

        let cartExists = cart.some(item => item.name === name);

        if (cartExists) {
            button.innerText = "Added";
            button.classList.add("added");
        }

        // Heart state
        let heart = productBox.querySelector(".heart");

        if (wishlist.some(item => item.name === name)) {
            heart.classList.remove("fa-regular");
heart.classList.add("fa-solid", "added");
        }
    });
};

function highlightContact() {
    const contact = document.getElementById("contact-details");

    contact.classList.add("focus-contact");

    setTimeout(function () {
        contact.classList.remove("focus-contact");
    }, 700);
}