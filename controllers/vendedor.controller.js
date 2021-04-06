const db = require("../models");
const Vendedor = db.dbAltCte.vendedor;
// const token = configBotAlta.token;
// Create and Save a new Order
// const bot = new TelegramBot(token, { polling: true });
const botAlta = require("../config/bot_alta.config");
const bot = botAlta.bot;

exports.findAll = (req, res) => {
    Vendedor.findAll({
        attributes: ['id_vendedor', 'nombre'],
        paranoid: false,
    }).then(r => {
        res.json(r);
    });
};

exports.create = (req, res) => {
    console.log(req.body);
    Vendedor.create(req.body, {
    })
        .then(client_created => {
            res.send(client_created);
            console.log("client created", client_created);
            var text = "Para: María De León Aguirre"
                + "\nAsunto: Pre-alta de cliente"
                + "\nPor medio del presente se le informa que el vendedor [ "
                + req.body.vendedor + " ] a capturado la pre-alta. \nCliente No." + client_created.dataValues.id
                + "\nNombre del cliente " + req.body.first + req.body.last
                + "\nTipo de Persona: " + req.body.tipo_persona
                + "\nFavor de revisar y complementar la información requerida para su autorización"
                + "\nAtentamente"
                + "\n" + req.body.vendedor
            bot.sendMessage("-511414945", text);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Video."
            });
        });
};

// exports.findAll = (req, res) => {
//     // const title = req.query.title;
//     const { id_client, page, size } = req.query;
//     var condition = id_client ? { clientId: id_client } : null;
//     const { limit, offset } = getPagination(page, size);
//     Ticket.findAndCountAll({
//         where: condition, include: [{
//             model: db.client, as: "client",
//         }, { model: db.statuscatalog, as: "status" },
//         { model: db.comments, as: "comments" }], limit, offset
//     })
//         .then(tickets => {
//             const response = getPagingData(tickets, page, limit);
//             res.json(response);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving videos."
//             });
//         });
// };
// exports.findAllAdmin = (req, res) => {
//     // const title = req.query.title;
//     const { page, size } = req.query;
//     const { limit, offset } = getPagination(page, size);
//     Ticket.findAndCountAll({
//         include: [{
//             model: db.client, as: "client",
//         }, { model: db.statuscatalog, as: "status" },
//         { model: db.comments, as: "comments" }]
//         , limit, offset
//     })
//         .then(tickets => {
//             const response = getPagingData(tickets, page, limit);
//             res.json(response);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving videos."
//             });
//         });
// };
// // //Update Order
// exports.update = (req, res) => {
//     const id = req.params.id;
//     Ticket.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "ticket was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update ticket with id=${id}. Maybe Order was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Order with id=" + id
//             });
//         });
// };