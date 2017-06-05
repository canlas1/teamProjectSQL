module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false

        },
        last_login: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }

    }, {
        classMethods: {
            associate: function(models) {
                // User.hasMany(models.beer);
                User.belongsToMany(models.beer, { through: "userbeer" });


            }
        }
    });


    return User;

}
