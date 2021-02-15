const db = require("../models");
const jwt = require("jsonwebtoken");
const Process = db.process
const Op = db.Sequelize.Op;


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
    Process.create(req.body, {
    })
        .then(subprocess_created => {
            res.send(process_created);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the subprocess."
            });
        });
};


// Find a single Video with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Process.findByPk(id, {
        include: [{
            model: db.client, as: "subproceso",
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Subprocess with id=" + err
            });
        });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;

    Process.findAndCountAll({
        where: condition
    })
        .then(proceso => {

            res.json(proceso);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving processes."
            });
        });
};
exports.findAllAdmin = (req, res) => {
    // const title = req.query.title;
    Process.findAll({})
        .then(proceso => {
            res.json(proceso);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving processes."
            });
        });
};
// //Update Order
exports.update = (req, res) => {
    const id = req.params.id;
    Process.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Process was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update process with id=${id}. Maybe Process was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Process with id=" + id
            });
        });
};