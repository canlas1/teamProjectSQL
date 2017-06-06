module.exports = function(sequelize, Sequelize) {

    var Beer = sequelize.define('beer', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        abv: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING,
            notEmpty: true,
            
        },

        img: {
            type: Sequelize.STRING,
            notEmpty: true
        },


        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }

    });

    return Beer;

}
