module.exports = function(sequelize, Sequelize) {

  const Article = sequelize.define('article',
    {
      title: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      keyWords: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
    }
  );

  return Article;
};
