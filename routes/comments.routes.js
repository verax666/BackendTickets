
module.exports = app => {
    const comment = require("../controllers/comment.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new client
    router.post("/", comment.create);

    router.delete("/:id", comment.delete);
    // Update a client with id
    // router.put("/:id", comment.update);

    // // Retrieve all orders
    // router.get("/", comment.findAll);

    app.use('/api/comments', router);
};