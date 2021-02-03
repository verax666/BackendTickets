module.exports = (sequelize, Sequelize) => {
    const Developer = sequelize.define("developer", {
        name: {
            type: Sequelize.STRING
        },
        user: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        assigns: {
            type: Sequelize.STRING
        },
        isconect: {
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.STRING
        }

    }, { paranoid: true });

    return Developer;
};