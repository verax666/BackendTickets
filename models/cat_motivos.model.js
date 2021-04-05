module.exports = (sequelize, Sequelize) => {
    const Motivos = sequelize.define("cat_motivos", {
        nombre: {
            type: Sequelize.STRING
        },
    }, { paranoid: true });
    return Motivos;
};