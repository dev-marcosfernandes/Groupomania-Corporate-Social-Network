module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Blogs', {
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    texte: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Post;
};



