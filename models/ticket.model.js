module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        name_employed: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        process: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    }, { paranoid: true });

    return Ticket;
};