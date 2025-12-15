const sequelize = require("../database.js");

// Импортируем все модели
// Они уже инициализированы через .init(), поэтому просто require()
const UserRole = require("./UserRole");
const OrderStatus = require("./OrderStatus");
const PaymentMethod = require("./PaymentMethod");
const ProductCategory = require("./ProductCategory");
const User = require("./User");
const Product = require("./Product");
const Price = require("./Price");
const Order = require("./Order");
const OrderPosition = require("./OrderPosition");
const CartProduct = require("./CartProduct");
const Favorite = require("./Favorite");

// ===== УСТАНАВЛИВАЕМ СВЯЗИ (ASSOCIATIONS) =====

// UserRole -> User (один ко многим)
// Одна роль может быть у многих пользователей
UserRole.hasMany(User, {
    foreignKey: "roleId", // Ключ в таблице users (camelCase!)
    as: "users", // Алиас для связи
});

// Обратная связь: User принадлежит UserRole
User.belongsTo(UserRole, {
    foreignKey: "roleId",
    as: "role",
});

// ProductCategory -> Product (один ко многим)
ProductCategory.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
});

Product.belongsTo(ProductCategory, {
    foreignKey: "categoryId",
    as: "category",
});

// Product -> Price (один ко многим)
// У одного товара много цен (история цен)
Product.hasMany(Price, {
    foreignKey: "productId",
    as: "prices",
});

Price.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// User -> Order (один ко многим)
User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
});

Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// OrderStatus -> Order (один ко многим)
OrderStatus.hasMany(Order, {
    foreignKey: "statusId",
    as: "orders",
});

Order.belongsTo(OrderStatus, {
    foreignKey: "statusId",
    as: "status",
});

// PaymentMethod -> Order (один ко многим)
PaymentMethod.hasMany(Order, {
    foreignKey: "paymentMethodId",
    as: "orders",
});

Order.belongsTo(PaymentMethod, {
    foreignKey: "paymentMethodId",
    as: "paymentMethod",
});

// Order -> OrderPosition (один ко многим)
Order.hasMany(OrderPosition, {
    foreignKey: "orderId",
    as: "positions",
});

OrderPosition.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});

// Product -> OrderPosition (один ко многим)
Product.hasMany(OrderPosition, {
    foreignKey: "productId",
    as: "orderPositions",
});

OrderPosition.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// Price -> OrderPosition (один ко многим)
Price.hasMany(OrderPosition, {
    foreignKey: "priceId",
    as: "orderPositions",
});

OrderPosition.belongsTo(Price, {
    foreignKey: "priceId",
    as: "price",
});

// User -> CartProduct (один ко многим)
User.hasMany(CartProduct, {
    foreignKey: "userId",
    as: "cartProducts",
});

CartProduct.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// Product -> CartProduct (один ко многим)
Product.hasMany(CartProduct, {
    foreignKey: "productId",
    as: "cartProducts",
});

CartProduct.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// User -> Favorite (один ко многим)
User.hasMany(Favorite, {
    foreignKey: "userId",
    as: "favorites",
});

Favorite.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// Product -> Favorite (один ко многим)
Product.hasMany(Favorite, {
    foreignKey: "productId",
    as: "favorites",
});

Favorite.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// Экспортируем всё
module.exports = {
    sequelize,
    UserRole,
    OrderStatus,
    PaymentMethod,
    ProductCategory,
    User,
    Product,
    Price,
    Order,
    OrderPosition,
    CartProduct,
    Favorite,
};
