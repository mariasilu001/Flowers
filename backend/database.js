require("dotenv").config();
const { Sequelize } = require("sequelize");

// Создаём экземпляр Sequelize, передавая строку подключения из .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Важно для Supabase!
        },
    },
    //logging: false  // Отключи логи SQL-запросов (или оставь console.log для отладки)
});

// Функция для проверки подключения
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Sequelize подключён к Supabase успешно!");
    } catch (error) {
        console.error("❌ Ошибка подключения Sequelize:", error.message);
    }
}

//testConnection();

module.exports = sequelize;
