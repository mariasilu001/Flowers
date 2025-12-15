const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class Price extends Model {}

Price.init(
  {
    priceId: {
      field: "price_id",
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

    price: {
      field: "price",
      type: DataTypes.DECIMAL(10, 2), // DECIMAL(10, 2) — 10 цифр, 2 после запятой
      allowNull: false,
    },

    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    startDate: {
      field: "start_date",            // Дата начала действия цены
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      field: "end_date",              // Дата окончания (может быть NULL)
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Price",
    tableName: "prices",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Price;
