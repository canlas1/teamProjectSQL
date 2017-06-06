module.exports = function(sequelize, Sequelize) {

    var Custombeer = sequelize.define('custombeer', {

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

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }

    });

    return Custombeer;

}
