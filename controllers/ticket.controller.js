const db = require("../models");
const jwt = require("jsonwebtoken");
const Ticket = db.ticket;
// const OrderDetail = db.order_detail;
// const User = db.user;
// const Group = db.group;
// const Product = db.product;
// const Branch = db.branch;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tickets } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tickets, totalPages, currentPage };
};
// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    //console.log(req.body);
    if (!req.body.title || !req.body.process) {
        res.status(440).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Save Order in the database
    Ticket.create(req.body, {
    })
        .then(ticket_created => {
            console.log(ticket_created);
            res.send(ticket_created);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Video."
            });
        });
};


// Find a single Video with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ticket.findByPk(id, {
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + err
            });
        });
};
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader;
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.Tickets_Secret_Key, (err, user) => {
        console.log(token)
        if (err) return res.sendStatus(403);
        req.query.id_client = user;
        console.log(user)
        next();
    })
}

exports.findAll = (req, res) => {
    // const title = req.query.title;
    const { id_client, page, size } = req.query;
    console.log(id_client)
    var condition = id_client ? { clientId: id_client } : null;
    const { limit, offset } = getPagination(page, size);
    Ticket.findAndCountAll({ where: condition, limit, offset })
        .then(tickets => {
            const response = getPagingData(tickets, page, limit);
            res.json(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving videos."
            });
        });
};
exports.findAllAdmin = (req, res) => {
    // const title = req.query.title;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Ticket.findAndCountAll({ limit, offset })
        .then(tickets => {
            const response = getPagingData(tickets, page, limit);
            res.json(response);
            console.log(response)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving videos."
            });
        });
};
// //Update Order
exports.update = (req, res) => {
    const id = req.params.id;

    Ticket.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ticket was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ticket with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

// // // Delete a Order with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Order.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Order was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Order with id=" + id
//             });
//         });
// };

// exports.addProduct = (req, res) => {
//     // Validate request
//     console.log(req.body);
//     if (!req.body.userId || !req.body.orderId || !req.body.productId) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }

//     // Add product
//     OrderDetail.create(req.body)
//         .then(product_added => {
//             console.log(product_added);
//             res.send(product_added);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message + err || "Some error occurred while Adding the Product."
//             });
//         });
// };

// //Update Product on order
// exports.updateProduct = (req, res) => {
//     const id = req.params.id;

//     OrderDetail.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Product was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Product with id=" + id
//             });
//         });
// };

// // Delete a Product with the specified id in the request
// exports.deleteProduct = (req, res) => {
//     const id = req.params.id;

//     OrderDetail.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Product was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Product with id=" + id
//             });
//         });
// };


// Retrieve all Video from the database.


// exports.findAllOrdersRestaurant = (req, res) => {
//     const restaurant_id = req.params.restaurant_id;

//     var condition = restaurant_id ? { restaurantId: restaurant_id } : null;

//     Order.findAll({
//         include: [{
//             model: OrderDetail
//         }],
//         where: condition
//     })
//         .then(orders => {
//             res.json({ orders: data });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving videos."
//             });
//         });
// };

// exports.findAllOrdersUser = (req, res) => {
//     const user_id = req.params.user_id;

//     var condition = user_id ? { userId: user_id } : null;

//     Order.findAll({
//         include: [{
//             model: OrderDetail, as: "orderDetail"
//         }],
//         where: condition
//     })
//         .then(orders => {
//             res.json({ orders: orders });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving videos."
//             });
//         });
// };

// exports.findActiveOrdersUser = (req, res) => {
//     const user_id = req.params.user_id;
//     const status = 1;
//     var condition = user_id ? { userId: user_id, status: status } : null;

//     Order.findAll({
//         include: [{
//             model: OrderDetail,
//             as: "orderDetail",
//             include: [{ model: Product, as: "products" }]
//         }, { model: Group, as: 'group' }, { model: User, as: "user" }, { model: Branch, as: "branch" }],
//         where: condition
//     })
//         .then(orders => {
//             console.log(orders.body);
//             res.json({ orders });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving videos."
//             });
//         });
// };

// exports.findAllOrdersDetailsUser = (req, res) => {
//     const user_id = req.params.user_id;

//     var condition = user_id ? { userId: user_id } : null;

//     OrderDetail.findAll({
//         include: [{
//             model: Order,
//             as: 'order'
//         }],
//         where: condition
//     })
//         .then(orders => {
//             res.json({ orders: orders });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving videos."
//             });
//         });
// };




// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Order.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Order was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Order with id=" + id
//             });
//         });
// };
