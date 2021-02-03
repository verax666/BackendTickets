module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        name: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.TEXT
        }

    }, { paranoid: true });

    return Client;
};