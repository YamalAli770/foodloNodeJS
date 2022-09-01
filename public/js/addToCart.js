const addToCart = (pID, pName, pPrice) => {
    if(!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
    }

    let cart = JSON.parse(localStorage.getItem("cart"));

    // Add To Cart

    let product = {id: pID, name: pName, price: pPrice, qty: 1};

    if(cart.length === 0) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    else if (cart.length > 0) {
        let result = cart.find(element => element.id === pID);
        if(result === undefined) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        else {
            result.qty = result.qty + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    window.location.href = `http://localhost:3000/cart/?products=${localStorage.getItem("cart")}`;
};
