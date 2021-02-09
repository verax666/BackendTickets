const db = require("../models");
const jwt = require("jsonwebtoken");
const Ticket = db.ticket;
const Client = db.client;

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
        include: [{
            model: db.client, as: "client",
        }, { model: db.statuscatalog, as: "status" }]
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
        if (err) return res.sendStatus(403);
        req.query.id_client = user;
        next();
    })
}

exports.findAll = (req, res) => {
    // const title = req.query.title;
    const { id_client, page, size } = req.query;
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
    Ticket.findAndCountAll({
        include: [{
            model: db.client, as: "client",
        }, { model: db.statuscatalog, as: "status" }]
        , limit, offset
    })
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