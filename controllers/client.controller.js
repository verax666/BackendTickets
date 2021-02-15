const db = require("../models");
const jwt = require("jsonwebtoken");
const Client = db.client;
// const OrderDetail = db.order_detail;
// const User = db.user;
// const Group = db.group;
// const Product = db.product;
// const Branch = db.branch;
const Op = db.Sequelize.Op;



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
    Client.create(req.body, {
    })
        .then(client_created => {
            res.send(client_created);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

exports.findOne = (req, res) => {
    const token = req.params.id;
    Client.findOne({ where: { token: token } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving client with id=" + err
            });
        });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;
    Client.findAll({ include: [{ model: db.process, as: "process", include: [{ model: db.subprocess, as: "subproceso" }] }] })
        .then(dev => {
            res.json(dev);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Clients."
            });
        });
};

// //Update Order
exports.update = (req, res) => {
    const id = req.params.id;

    Developer.update(req.body, {
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