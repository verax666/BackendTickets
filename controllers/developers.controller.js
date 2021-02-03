const db = require("../models");
const jwt = require("jsonwebtoken");
const Developer = db.developers;
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Developer.findByPk(id, {
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
        req.query.id = user;
        console.log(user)
        next();
    })
}

exports.findAll = (req, res) => {
    // const title = req.query.title;
    const { id, page, size } = req.query;
    var condition = id ? { id: id } : null;
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