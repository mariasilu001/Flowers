const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class PaymentMethod extends Model {}

PaymentMethod.init(
  {
    paymentMethodId: {
      field: "payment_method_id",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      field: "name",
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isActive: {
      field: "is_active",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,            // По умолчанию активен
    },
  },
  {
    sequelize,
    modelName: "PaymentMethod",
    tableName: "payment_methods",
    timestamps: false,
    underscored: true,
    // Можно добавить scope, чтобы по умолчанию показывать только активные
    defaultScope: {
      where: {
        isActive: true,
      },
    },
  }
);

module.exports = PaymentMethod;
