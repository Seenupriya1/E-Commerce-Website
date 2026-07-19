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
    let price = parseInt(
        productBox.querySelector(".price").innerText.replace("₹", "")
    );

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


        cart = cart.filter(item => item.name !== name);

        button.innerText = "Add to Cart";
        button.classList.remove("added");

    } else {


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
        window.location.href = "/newborn";
    }
    else if (search.includes("baby girl")) {
        window.location.href = "/babygirl";
    }
    else if (search.includes("baby boy")) {
        window.location.href = "/babyboy";
    }
    else if (search.includes("t-shirts for women")) {
        window.location.href = "/w_tshirts";
    }
    else if (search.includes("jeans for women")) {
        window.location.href = "/w_jeans";
    }
    else if (search.includes("tops")) {
        window.location.href = "/tops";
    }
    else if (search.includes("skirts")) {
        window.location.href = "/skirts";
    }
    else if (search.includes("ethnic wear")) {
        window.location.href = "/ethnic_wear";
    }
    else if (search.includes("t shirts for men") ||
        search.includes("t-shirts for men")
    ) {
        window.location.href = "/m_tshirts";
    }
    else if (search.includes("jeans for men")) {
        window.location.href = "/m_jeans";
    }
    else if (search.includes("shirts")) {
        window.location.href = "/shirts";
    }
    else if (search.includes("trackpants")) {
        window.location.href = "/trackpants";
    }
    else if (search.includes("pants")) {
        window.location.href = "/pants";
    }
    else if (search.includes("caps")) {
        window.location.href = "/caps";
    }
    else if (search.includes("bags")) {
        window.location.href = "/bags";
    }
    else if (search.includes("watches")) {
        window.location.href = "/watches";
    }
    else if (search.includes("sunglass")) {
        window.location.href = "/sunglasses";
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


        let button = productBox.querySelector(".add-cart");

        let cartExists = cart.some(item => item.name === name);

        if (cartExists) {
            button.innerText = "Added";
            button.classList.add("added");
        }


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

let slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index) {

    slides[current].classList.remove("active");

    current = index;

    if (current >= slides.length) {
        current = 0;
    }

    if (current < 0) {
        current = slides.length - 1;
    }

    slides[current].classList.add("active");
}


function nextSlide() {
    showSlide(current + 1);
}


function prevSlide() {
    showSlide(current - 1);
}


setInterval(() => {
    nextSlide();
}, 4000);   