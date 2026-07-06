function addSaleToCart(button) {

    const productBox = button.closest(".image-box");

    const image = productBox.querySelector("img").src;
    const name = productBox.querySelector("figcaption").innerText;

    const originalPrice = parseInt(
        productBox.querySelector(".price").innerText.replace("₹", "")
    );

    const salePrice = Math.floor(originalPrice * 0.5);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.some(item => item.name === name);

    if (exists) {

        cart = cart.filter(item => item.name !== name);

        button.innerText = "Add to Cart";
        button.classList.remove("added");

    } else {

        cart.push({
            image,
            name,
            originalPrice,
            price: "₹" + salePrice,
            sale: true
        });

        button.innerText = "Added";
        button.classList.add("added");
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cart-count").innerText = cart.length;
}