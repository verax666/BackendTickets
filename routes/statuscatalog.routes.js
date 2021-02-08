module.exports = app => {
    const statuscatalog = require("../controllers/statuscatalog.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new client
    router.post("/", statuscatalog.create);

    // Update a client with id
    router.put("/:id", statuscatalog.update);

    // // Retrieve all orders
    router.get("/", statuscatalog.findAll);
    // 

    router.get("/:id", statuscatalog.findOne);

    app.use('/api/statuscatalog', router);
};