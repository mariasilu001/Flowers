const express = require("express");
const { User, sequelize } = require("./models/index.js");
const authRouter = require("./routers/authRouter.js");
const categoryRouter = require("./routers/categoryRouter.js");
const productRouter = require("./routers/productRouter.js");
const cartRouter = require("./routers/cartRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const userRouter = require("./routers/userRouter.js");
const favoriteController = require("./routers/favoriteRouter.js");
const otherRouter = require("./routers/otherRouter.js");

const authToken = require("./middleware/authToken.js");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    const user = await User.findOne({
        where: {
            userId: 1,
        },
    });
    res.json({ message: "Server works!!!", user: user });
});

app.use("/auth", authRouter); // направляет действие программы в authRouter в отдельном файле

app.use("/categories", categoryRouter); // направляет действие программы в categoryRouter в отдельном файле

app.use("/products", productRouter); // направляет действие программы в productRouter в отдельном файле

app.use("/cart", authToken, cartRouter); // направляет действие программы сначала в промежуточное ПО authToken, а потом в cartRouter в отдельном файле

app.use("/orders", authToken, orderRouter); // направляет действие программы сначала в промежуточное ПО authToken, а потом в orderRouter в отдельном файле

app.use("/users", authToken, userRouter); // направляет действие программы сначала в промежуточное ПО authToken, а потом в userRouter в отдельном файле

app.use("/favorites", authToken, favoriteController); // направляет действие программы сначала в промежуточное ПО authToken, а потом в favoriteController в отдельном файле

app.use("/other", otherRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: err.message,
    });
});

/*/ ================= МАГИЯ ЗДЕСЬ =================
const start = async () => {
    try {
        // sync() смотрит на твои модели и создает таблицы, если их нет
        // { force: true } - УДАЛИТ все таблицы и создаст заново (ОПАСНО: данные сотрутся!)
        // { alter: true } - Попытается изменить таблицы под модели, сохранив данные (но с SQLite это работает кривовато)
        // Пусто (без параметров) - Создаст только те таблицы, которых нет.
        
        // Для первого запуска или когда ты меняешь структуру моделей, используй force: true (НО ТОЛЬКО ДЛЯ РАЗРАБОТКИ!)
        await sequelize.sync({ force: true }); 
        console.log("✅ Все таблицы успешно созданы!");

        // Здесь можно вызвать функцию для заполнения начальными данными (сидинг)
        // await seedData(); 

        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    } catch (e) {
        console.error("❌ Ошибка при запуске сервера:", e);
    }
};

start();*/

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
