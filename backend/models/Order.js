const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class Order extends Model {}

Order.init(
  {
    orderId: {
      field: "order_id",
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

    statusId: {
      field: "status_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "order_statuses",
        key: "status_id",
      },
    },

    paymentMethodId: {
      field: "payment_method_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "payment_methods",
        key: "payment_method_id",
      },
    },

    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    note: {
      field: "note",                  // Примечание к заказу
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isDeleted: {
      field: "is_deleted",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false,
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
  }
);

module.exports = Order;
