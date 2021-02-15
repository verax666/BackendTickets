module.exports = app => {
    const subprocess = require("../controllers/subproceso.controller");

    var router = require("express").Router();

    //INPUT ROUTES
    // Create a new order
    router.post("/", subprocess.create);

    // Update a order with id
    router.put("/:id", subprocess.update);

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
    router.get("/", subprocess.authenticateToken, subprocess.findAll);
    router.get("/get/", subprocess.findAllAdmin);


    // // Retrieve all orders
    // router.get("/restaurant/:restaurant_id", orders.findAllOrdersRestaurant);

    // // Retrieve all orders
    // router.get("/user/:user_id", orders.findAllOrdersUser);

    // // Retrieve all orders
    // router.get("/user/active/:user_id", orders.findActiveOrdersUser);

    // // Retrieve all orders
    // router.get("/user/order_detail/:user_id", orders.findAllOrdersDetailsUser);

    // Retrieve a single order with id
    router.get("/:id", subprocess.findOne);

    app.use('/api/subprocess', router);
};