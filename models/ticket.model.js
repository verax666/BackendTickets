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
        subprocess: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
    }, { paranoid: true });

    return Ticket;
};