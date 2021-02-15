module.exports = (sequelize, Sequelize) => {
    const Subproceso = sequelize.define("subproceso", {
        name: {
            type: Sequelize.STRING
        }
    }, { paranoid: true });

    return Subproceso;
};