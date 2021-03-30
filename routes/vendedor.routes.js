module.exports = app => {
    const vendendor = require("../controllers/vendedor.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new order
    router.get("/findall", vendendor.findAll);
    // Retrieve a single order with id
    app.use('/api/vendedor', router);
};