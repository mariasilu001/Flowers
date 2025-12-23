const express = require("express");
const { User } = require("./models/index.js");
const authRouter = require("./routers/authRouter.js");
const categoryRouter = require("./routers/categoryRouter.js");
const productRouter = require("./routers/productRouter.js");
const cartRouter = require("./routers/cartRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const userRouter = require("./routers/userRouter.js");
const favoriteController = require('./routers/favoriteRouter.js')

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

app.use("/auth", authRouter);

app.use("/categories", categoryRouter);

app.use("/products", productRouter);

app.use("/cart", authToken, cartRouter);

app.use("/orders", authToken, orderRouter);

app.use("/users", authToken, userRouter);

app.use("/favorites", authToken, favoriteController)

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
