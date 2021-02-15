module.exports = (sequelize, Sequelize) => {
    const Proceso = sequelize.define("proceso", {
        name: {
            type: Sequelize.STRING
        }
    }, { paranoid: true });

    return Proceso;
};