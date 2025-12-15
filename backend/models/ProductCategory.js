const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class ProductCategory extends Model {}

ProductCategory.init(
  {
    categoryId: {
      field: "category_id",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      field: "name",
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isExpirationDate: {
      field: "is_expiration_date",   // Есть ли у товаров срок годности
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    isDeleted: {
      field: "is_deleted",           // Мягкое удаление
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ProductCategory",
    tableName: "product_categories",
    timestamps: false,
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,            // По умолчанию не показываем удалённые
      },
    },
  }
);

module.exports = ProductCategory;
