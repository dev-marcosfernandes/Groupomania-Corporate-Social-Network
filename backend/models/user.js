module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Utilisateurs", {
      prenom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin: {
        type: DataTypes.TINYINT, allowNull: true, default: 0
      },
        photo: {
          type: DataTypes.STRING,
          allowNull: true
        },
    });
    return User;
  };