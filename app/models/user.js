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
        User.belongsToMany(models.beer, {through: "userbeer"});

<<<<<<< HEAD
                }
            }
        });
=======
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        // classMethods: {
        //     associate: function(models) {
        //         Burger.hasOne(models.Customer);
        //     }
        // }

    });
>>>>>>> b03a4b9c9c202f4c6da64d98793474899cac05af

return User;

}
