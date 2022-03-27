const exp = require("express");
let products = require("../assets/products");

const productApi = exp.Router();
productApi.use(exp.json());

// middleware to be executed for all requests.
const url_middleware = (request, response, next) => {
  console.log(`Request url: ${request.url}`);
  next();
};
productApi.use(url_middleware);

// middleware to be executed for all the requests.
productApi.use((request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    console.log("Request has no body.");
  } else {
    console.log("Request has body.");
  }
  next();
});

// middleware for add product route.
const addProduct_middleware = (request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    response.send({ message: "Cannot add invalid product." });
  } else {
    console.log(request.body);
    next();
  }
};

// middleware to delete product.
const deletProduct_middleware = (request, response, next) => {
  console.log("Deleting our precious product...");
  next();
};

// get products
productApi.get("/get-products", (request, response) => {
  response.send({
    message: "All the products.",
    payload: products,
  });
});

productApi.post("/add-product/", addProduct_middleware, (request, response) => {
  const newProduct = request.body;
  products.push(newProduct);
  response.send({ message: "Succesfully added new user." });
});

module.exports = productApi;
