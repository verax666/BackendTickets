module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        fecha: {
            type: Sequelize.DATE
        },
        first: {
            type: Sequelize.STRING
        },
        last: {
            type: Sequelize.STRING
        },
        vendedor: {
            type: Sequelize.STRING
        },
        tipo_persona: {
            type: Sequelize.STRING
        },
        tipo_cliente: {
            type: Sequelize.STRING
        },
        solicita_cliente: {
            type: Sequelize.STRING
        },
        limite: {
            type: Sequelize.STRING
        },
        plazo: {
            type: Sequelize.STRING
        },
        t_pago: {
            type: Sequelize.INTEGER
        },
        razon_social: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        marketing: {
            type: Sequelize.STRING
        },
        calle_num: {
            type: Sequelize.STRING
        },
        ciudad: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING
        },
        cod_postal: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        comprobante_file: {
            type: Sequelize.STRING
        },
        dom_file: {
            type: Sequelize.STRING
        },
        ine_front: {
            type: Sequelize.STRING
        },
        ine_back: {
            type: Sequelize.STRING
        },
        autorizado: {
            type: Sequelize.INTEGER
        },
        idmsgc: {
            type: Sequelize.STRING
        },
        idmsgd: {
            type: Sequelize.STRING
        }
    }, { paranoid: true });

    return Client;
};