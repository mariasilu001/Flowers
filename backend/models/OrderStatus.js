const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");

class OrderStatus extends Model {}

OrderStatus.init(
    {
        statusId: {
            field: "status_id",
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            field: "name",
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        description: {
            field: "description",
            type: DataTypes.TEXT, // TEXT — неограниченная строка
            allowNull: true, // Может быть NULL
        },
    },
    {
        sequelize,
        modelName: "OrderStatus",
        tableName: "order_statuses",
        timestamps: false,
        underscored: true,
    }
);

module.exports = OrderStatus;
