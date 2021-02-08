const db = require("../models");
const jwt = require("jsonwebtoken");
const StatusCatalog = db.statuscatalog;
// const OrderDetail = db.order_detail;
// const User = db.user;
// const Group = db.group;
// const Product = db.product;
// const Branch = db.branch;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.process) {
        res.status(440).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Save Order in the database
    StatusCatalog.create(req.body, {
    })
        .then(status_created => {
            res.send(status_created);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Status."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    StatusCatalog.findByPk(id, {
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving status with id=" + err
            });
        });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;
    StatusCatalog.findAll()
        .then(status => {
            res.json(status);
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

    StatusCatalog.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "status was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update status with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Status with id=" + id
            });
        });
};