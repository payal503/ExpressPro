
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";

export const viewDescription = (request, response, next) => {
    let id = request.params.productId;
    Product.findById(id)
        .then(result => {
            return response.render("description.ejs", {
                currentUser: request.session.user.currentUser,
                product: result[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export const allProduct = (request, response, next) => {
    Promise.all([Product.getList(), Category.getList()])
        .then(result => {
            return response.render("products.ejs", { productList: result[0], categoryList: result[1], currentUser: request.session.user, message: "" })
        })
        .catch(err => {
            console.log(err);
        });
}

export const productByCategory = (request, response, next) => {
    let categoryName = request.params.categoryName;
    Promise.all([Product.getProductByCategory(categoryName), Category.getList()])
        .then(result => {
            return response.render("products.ejs", {
                productList: result[0],
                categoryList: result[1],
                currentUser: request.session.user,
                message: ''
            })
        }).catch(err => {
            console.log(err);
        })
}

export const search = (request, response, next) => {
    console.log(request.params.keyword);
    Product.getProductByKeyword(request.params.keyword)
        .then(result => {
            return response.status(200).json({ productList: result });
        }).catch(err => {
            console.log(err);
        })
}
