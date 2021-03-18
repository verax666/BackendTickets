const db = require("../models");
const Client = db.client;
const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from // @BotFather
const token = '1687894814:AAHi5cYJortF3Z3se_jVYiXzDrnUvda5aJU';
// Create and Save a new Order
const bot = new TelegramBot(token, { polling: true });

exports.create = (req, res) => {
    console.log(req.body);
    Client.create(req.body, {
    })
        .then(client_created => {
            res.send(client_created);
            console.log("client created", client_created)
            bot.sendMessage("1687894814", 'Nuevo Prospecto: ' + req.body.first + "" + req.body.last + "\nVendedor Asignado: " + req.body.vendedor + "\nLink del Perfil: " + "http://localhost/concremovil/pantallas/detalles_prosp/");
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