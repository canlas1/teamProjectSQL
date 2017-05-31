module.exports = function(sequelize, Sequelize) {

    var Beer = sequelize.define('beer', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        beername: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        breweryname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        origin: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        type: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        // email: {
        //     type: Sequelize.STRING,
        //     validate: {
        //         isEmail: true
        //     }
        // },
        // password: {
        //     type: Sequelize.STRING,
        //     allowNull: false

        // },
        // last_login: {
        //     type: Sequelize.DATE,
        //     defaultValue: Sequelize.NOW
        // },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }

    });

    return Beer;

}
