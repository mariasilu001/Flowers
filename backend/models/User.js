const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class User extends Model {}

User.init(
  {
    userId: {
      field: "user_id",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      field: "email",
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,                  // UNIQUE constraint
    },

    passwordHash: {
      field: "password_hash",
      type: DataTypes.TEXT,
      allowNull: false,
    },

    firstName: {
      field: "first_name",
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    lastName: {
      field: "last_name",
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    surname: {
      field: "surname",
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    phoneNumber: {
      field: "phone_number",
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    roleId: {
      field: "role_id",
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {                  // Foreign Key
        model: "user_roles",         // Имя таблицы
        key: "role_id",              // Колонка в той таблице
      },
    },

    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,   // CURRENT_TIMESTAMP
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
    modelName: "User",
    tableName: "users",
    timestamps: false,               // Мы сами управляем createdAt
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
  }
);

module.exports = User;
