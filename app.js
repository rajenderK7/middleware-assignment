// import the express module
const exp = require("express");

// import userApi
const userApi = require("./apis/userAPI");

// import productApi
const productApi = require("./apis/productAPI");

// create the express object (API).
const app = exp();

// Using the JSON middleware to accept data from client request.
app.use(exp.json());

// Using the userApi
app.use("/user-api", userApi);

// Using the productApi
app.use("/product-api", productApi);

// handling invalid paths.
// middileware for handling invalid paths
app.use((request, response, next) => {
  response.send({ message: `Invalid URL: ${request.url}` });
});

// middleware for error handling
app.use((error, request, response, next) => {
  response.send({ message: `Error occured: ${error.message}` });
});

// Assign a port to the server.
app.listen(3000, () => console.log("Server is running..."));
