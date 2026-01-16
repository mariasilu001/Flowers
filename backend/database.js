// ============= ПОДКЛЮЧЕНИЕ ЧЕРЕЗ SQLITE =============
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Имя файла, где будет жить база
    logging: true // Отключаем лишний шум в консоли
});

// Проверка подключения (сразу увидишь в терминале, что всё ок)
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ База данных (SQLite) подключена успешно!");
    } catch (error) {
        console.error("❌ Ошибка подключения к SQLite:", error);
    }
})();

module.exports = sequelize;

// ============= ПОДКЛЮЧЕНИЕ ЧЕРЕЗ LOCALHOST =============
/*
require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "flowers_shop",
    "postgres",
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres"
    }
);

module.exports = sequelize;
*/
// ============= ПОДКЛЮЧЕНИЕ ЧЕРЕЗ SUPABASE =============
/*
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
        statement_timeout: 20000, // 5000 миллисекунд = 5 секунд
        query_timeout: 20000,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false, // Отключи логи SQL-запросов (или оставь console.log для отладки)
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
*/