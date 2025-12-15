const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class Product extends Model {}

Product.init(
  {
    productId: {
      field: "product_id",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    categoryId: {
      field: "category_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "product_categories",
        key: "category_id",
      },
    },

    name: {
      field: "name",
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    expirationDate: {
      field: "expiration_date",      // Срок годности в днях (или другой единице)
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    description: {
      field: "description",
      type: DataTypes.TEXT,
      allowNull: true,
    },

    imagePath: {
      field: "image_path",
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    modelName: "Product",
    tableName: "products",
    timestamps: false,
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
  }
);

module.exports = Product;
