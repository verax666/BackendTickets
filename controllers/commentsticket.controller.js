const db = require("../models");
const jwt = require("jsonwebtoken");
const { commentsticket } = require("../models");
const Commentticket = db.commentsticket;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    Commentticket.create(req.body, {
    })
        .then(comment_created => {
            res.send(comment_created);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment."
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Commentticket.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};