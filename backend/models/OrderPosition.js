const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class OrderPosition extends Model {}

OrderPosition.init(
  {
    positionId: {
      field: "position_id",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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

    orderId: {
      field: "order_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "orders",
        key: "order_id",
      },
    },

    quantity: {
      field: "quantity",
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,                       // CHECK (quantity > 0)
      },
    },

    priceId: {
      field: "price_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "prices",
        key: "price_id",
      },
    },
  },
  {
    sequelize,
    modelName: "OrderPosition",
    tableName: "order_positions",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,                 // UNIQUE constraint
        fields: ["product_id", "order_id"], // Комбинация должна быть уникальной
        name: "uq_order_positions_product_order", // Имя индекса
      },
    ],
  }
);

module.exports = OrderPosition;
