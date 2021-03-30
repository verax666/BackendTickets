module.exports = (sequelize, Sequelize) => {
    const Vendedor = sequelize.define("cat_vendedores", {
        id_vendedor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        numero_vendedor: {
            type: Sequelize.INTEGER
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
    }, { paranoid: false });

    return Vendedor;
};