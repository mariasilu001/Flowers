// Импортируем наш клиент Supabase
const supabase = require("./db.js");

// Async функция для тестирования
async function testConnection() {
    try {
        // Пытаемся получить данные из таблицы 'todos' (которую видно на твоём скриншоте)
        const { data, error } = await supabase
            .from("users") // Выбираем таблицу todos
            .select("*") // Выбираем все колонки (*)
            .limit(5); // Ограничиваем 5 записями

        // Если есть ошибка
        if (error) {
            console.error("Ошибка подключения:", error.message);
            return;
        }

        // Если всё ок — выводим данные
        console.log("✅ Подключение успешно! Данные:", data);
    } catch (err) {
        console.error("Непредвиденная ошибка:", err);
    }
}

// Вызываем функцию
testConnection();
