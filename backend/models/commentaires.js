module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Commentaires', {
    texte: {
      type: DataTypes.STRING,
      allowNull: false
    },
    },
    {timestamps: false}
    );
  return Comment;
};






  