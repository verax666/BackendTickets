module.exports = app => {
    const client = require("../controllers/client.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new client
    router.post("/", client.create);

    // Update a client with id
    router.put("/:id", client.update);

    // // Retrieve all orders
    router.get("/", client.findAll);
    // 

    router.get("/:id", client.findOne);

    app.use('/api/client', router);
};