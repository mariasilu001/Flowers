// Подключаем библиотеку для работы с .env файлом
require("dotenv").config({ path: __dirname + "/.env" });

// Импортируем функцию создания клиента из библиотеки Supabase
const { createClient } = require("@supabase/supabase-js");

// Достаём переменные окружения из файла .env
// process.env — это объект Node.js, где хранятся все переменные окружения
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Проверяем, что переменные загрузились
if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        "Не найдены SUPABASE_URL или SUPABASE_ANON_KEY в файле .env"
    );
}

// Создаём клиент Supabase
// Это объект, через который мы будем общаться с базой данных
const supabase = createClient(supabaseUrl, supabaseKey);

// Экспортируем клиент, чтобы использовать его в других файлах
module.exports = supabase;
