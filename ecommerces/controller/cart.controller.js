import Cart from "../model/cart.model.js";
import Cart1 from "../model/cart.model.js";

export const addToCart = (request, response, next) => {
    // return response.end("Product added in cart....");
    let userId = request.params.userId * 1 - 1543;
    let productId = request.params.productId * 1 - 2567;

    let cart = new Cart();
    cart.userId = userId;
    cart.productId = productId;

    cart.isProductExist()
        .then(result => {
            console.log(result);
            if (!result.length) {
                cart.save()
                    .then(result => {
                        return response.json({ message: "Product added in cart succesfully" });
                    });
            }
            else
                return response.json({ message: "Product is already added in cart" });
        })
        .catch(err => {
            console.log(err)
        });
}
export const viewCart = (request, response, next) => {
    let userId = request.session.user.id;

    Cart.viewCartPro(userId).then(result => {
        // console.log(result);
        return response.render("addtocart.ejs", { currentUser: request.session.user, cartItems: JSON.parse(JSON.stringify(result)) });
    }).catch(err => {
        console.log(err);
    });
}

export const loadCart = (request, response, next) => {
    let userId = request.session.user.id;
    Cart1.viewCartPro(userId)
        .then(result => {
            return response.status(200).json(result)
        }).catch(err => {
            console.log(err);
        })
}

export const remove = (request, response, next) => {
    let userId = request.session.user.id;
    let productId = request.params.productId;
    Cart.deletepro(productId, userId)
        .then(result => {
            return response.redirect("/cart/view-cart");
        }).catch(err => {
            console.log(err);
        });
}
