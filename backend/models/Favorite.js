const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class Favorite extends Model {}

Favorite.init(
  {
    favoriteId: {
      field: "favorite_id",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      field: "user_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },

    productId: {
      field: "product_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id",
      },
    },
  },
  {
    sequelize,
    modelName: "Favorite",
    tableName: "favorites",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
        name: "uq_favorites_user_product",
      },
    ],
  }
);

module.exports = Favorite;
