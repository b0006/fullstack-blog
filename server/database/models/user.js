module.exports = function(sequelize, Sequelize) {

  const User = sequelize.define('user',
    {
      login: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
    }
  );

  return User;
};
