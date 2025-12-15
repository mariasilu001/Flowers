const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

// Создаём класс UserRole, который наследует Model
class UserRole extends Model {}

// Инициализируем модель через метод init
UserRole.init(
    {
        // Первый объект — описание полей

        roleId: {
            field: "role_id", // В БД: role_id, в коде: roleId
            type: DataTypes.BIGINT, // BIGSERIAL → BIGINT
            primaryKey: true, // Первичный ключ
            autoIncrement: true, // Автоинкремент
        },

        name: {
            field: "name", // Название роли
            type: DataTypes.STRING(255), // VARCHAR(255)
            allowNull: false, // NOT NULL
        },
    },
    {
        // Второй объект — настройки модели

        sequelize, // Передаём подключение к БД
        modelName: "UserRole", // Имя модели в коде
        tableName: "user_roles", // Точное имя таблицы в БД
        timestamps: false, // Не создавать createdAt/updatedAt
        underscored: true, // Использовать snake_case для служебных полей
    }
);

module.exports = UserRole;
