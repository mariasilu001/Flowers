const { Product } = require('../../models'); 

module.exports = async (req, res, next) => {
  try {
    // 1. Сразу достаем переменные
    let { name, categoryId, description, expirationDate } = req.body;

    // 2. Логика очистки даты.
    if (
      expirationDate === 'null' ||
      expirationDate === 'undefined' ||
      expirationDate === ''
    ) {
      expirationDate = null;
    }

    // 3. ЗАЩИТА ОТ ДУРАКА (Проверка файла)
    if (!req.file) {
      const err = new Error('Где фото, крошка? Товар без фото я не приму.');
      err.status = 400; 
      throw err; 
    }

    const { filename } = req.file;

    const newProduct = await Product.create({
      name,
      categoryId,
      imagePath: filename,
      expirationDate,
      description,
    });

    return res.json({
      message: 'Продукт добавлен успешно',
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
