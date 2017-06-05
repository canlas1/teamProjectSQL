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

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }

    }, {
    classMethods: {
      associate: function(models) {
        // Beer.belongsTo(models.userbeer, {foreignKay: "id"});
        // Beer.hasMany(models.Userbeer);
        Beer.belongsToMany(models.user, {through: "userbeer"});

      }
    }
  });

    return Beer;

}
