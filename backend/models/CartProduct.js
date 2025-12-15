const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class CartProduct extends Model {}

CartProduct.init(
  {
    cartProductId: {
      field: "cart_product_id",
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

    quantity: {
      field: "quantity",
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    modelName: "CartProduct",
    tableName: "cart_products",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
        name: "uq_cart_products_user_product",
      },
    ],
  }
);

module.exports = CartProduct;
