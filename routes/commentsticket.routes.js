const { commentsticket } = require("../models");

module.exports = app => {
    const commentticket = require("../controllers/commentsticket.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new client
    router.post("/", commentticket.create);

    // Delete a order with id
    router.delete("/:id", commentticket.delete);
    // Update a client with id
    // router.put("/:id", comment.update);

    // // Retrieve all orders
    // router.get("/", comment.findAll);

    app.use('/api/commentsticket', router);
};