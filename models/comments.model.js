module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        Usuario: {
            type: Sequelize.STRING
        },
        prevstatus: {
            type: Sequelize.STRING
        },
        actualstatus: {
            type: Sequelize.STRING
        },
        prevcolor: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.TEXT
        }
    }, { paranoid: true });

    return Comment;
};