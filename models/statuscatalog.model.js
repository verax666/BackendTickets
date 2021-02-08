module.exports = (sequelize, Sequelize) => {
    const StatusCatalog = sequelize.define("status_catalog", {
        name: {
            type: Sequelize.STRING
        }
    }, { paranoid: true });

    return StatusCatalog;
};