export default (sequelize, DataTypes) => {
  const Channel = sequelize.define("channels", {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  });

  Channel.associate = models => {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: "teamId"
    });
    Channel.belongsToMany(models.User, {
      through: "channel_member",
      foreignKey: "channelId"
    });
  };

  return Channel;
};
