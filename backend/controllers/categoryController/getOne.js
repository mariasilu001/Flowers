const { ProductCategory } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no data" });
        }

        const category = await ProductCategory.findByPk(id);
        if (!category) {
            return res
                .status(404)
                .json({ message: `category with id = ${id} not found` });
        }

        return res.json({
            message: "Категория найдена успешно",
            category: category,
        });
    } catch (error) {
        next(error);
    }
};
