module.exports = app => {
    const ticket = require("../controllers/ticket.controller.js");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new order
    router.post("/", ticket.create);

    // // Update a order with id
    // router.put("/:id", ticket.update);

    // // Delete a order with id
    // router.delete("/:id", ticket.delete);

    // Add a new product to Order
    // router.post("/product", orders.addProduct);

    // // Update a product of an Order
    // router.put("/product/:id", orders.updateProduct);

    // // Delete a product of an Order
    // router.delete("/product/:id", orders.deleteProduct);


    // //OUTPUT ROUTES
    // // Retrieve all orders
    router.get("/", ticket.authenticateToken, ticket.findAll);
    router.get("/get/", ticket.findAllAdmin);


    // // Retrieve all orders
    // router.get("/restaurant/:restaurant_id", orders.findAllOrdersRestaurant);

    // // Retrieve all orders
    // router.get("/user/:user_id", orders.findAllOrdersUser);

    // // Retrieve all orders
    // router.get("/user/active/:user_id", orders.findActiveOrdersUser);

    // // Retrieve all orders
    // router.get("/user/order_detail/:user_id", orders.findAllOrdersDetailsUser);

    // Retrieve a single order with id
    router.get("/:id", ticket.findOne);

    app.use('/api/ticket', router);
};