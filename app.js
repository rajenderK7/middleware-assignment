// import the express module
const exp = require("express");
const { request } = require("http");

// import dummy users data.
let users = require("./assets/users");

// create the express object (API).
const app = exp();

// Using the JSON middleware to accept data from client request.
app.use(exp.json());

// middleware to be executed for all requests.
const url_middleware = (request, response, next) => {
  console.log(`Request url: ${request.url}`);
  next();
};
app.use(url_middleware);

// middleware to be executed for all the requests.
app.use((request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    console.log("Request has no body.");
  } else {
    console.log("Request has body.");
  }
  next();
});

// middleware for add user route.
const addUser_middleware = (request, response, next) => {
  if (Object.keys(request.body).length === 0) {
    response.send({ message: "Cannot add invalid user." });
  } else {
    console.log(request.body);
    next();
  }
};

const deletUser_middleware = (request, response, next) => {
  console.log("Deleting our precious user...");
  next();
};

// get users
app.get("/get-users", (request, response) => {
  response.send({
    message: "All the users.",
    payload: users,
  });
});

// To add a middleware that is to be executed only for particular
// request the syntax is
// app.http-method("path", middleware, (request, response) => {});

// add user
app.post("/add-user", addUser_middleware, (request, response) => {
  users.push(request.body);
  response.send({ message: "Succesfully added user." });
});

app.put("/update-user/:id", (request, response) => {
  const _id = Number(request.params.id);
  const updateUserObj = request.body;
  // Check if the user exits or not.
  const user = users.find((user) => user.id === _id);
  if (user === undefined) {
    response.send({ message: "User does not exist." });
  } else {
    if (updateUserObj.name !== undefined) {
      user.name = updateUserObj.name;
    }
    if (updateUserObj.username !== undefined) {
      user.username = updateUserObj.username;
    }
    if (updateUserObj.email !== undefined) {
      user.email = updateUserObj.email;
    }
    response.send({ message: "Succesfully updated the user." });
  }
});

// delete user
app.delete("/delete-user/:id", deletUser_middleware, (request, response) => {
  const _id = +request.params.id;
  users = users.filter((user) => user.id !== _id);
  response.send({ message: "Succesfully delted user." });
});

// Assign a port to the server.
app.listen(3000, () => console.log("Server is running..."));
