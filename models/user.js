export default (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: "members",
      foreignKey: "userId"
    });
  };

  return User;
};
