const express = require("express");
const { User } = require("./models/index.js");

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

app.listen(3000, () => {
    console.log("Server is running http://localhost:3000");
});
