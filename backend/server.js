const express = require("express");
const { User } = require("./models/index.js");
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

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
