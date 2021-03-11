module.exports = app => {
    const client = require("../controllers/client.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new order
    router.post("/", client.create);
    // Retrieve a single order with id
    app.use('/api/client', router);
};