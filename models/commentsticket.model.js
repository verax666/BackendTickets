module.exports = (sequelize, Sequelize) => {
    const Commenticket = sequelize.define("commenticket", {
        Usuario: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.TEXT
        }
    }, { paranoid: true });

    return Commenticket;
};