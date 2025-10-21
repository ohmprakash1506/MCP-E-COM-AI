import { User } from './user.model';
import { Brand } from './brand.model';
import { UserBrand } from './userBrand.model';
import { Product } from './product.model';
import { Cart } from './cart.model';
import { CartItem } from './cartItem.model';
import { Order } from './order.model';
import sequelize from '../config/db.config';

// User - Brand (Admin)
User.hasMany(Brand, { foreignKey: 'adminId', as: 'ownedBrands' });
Brand.belongsTo(User, { foreignKey: 'adminId', as: 'admin' });

// User - Brand (Many-to-Many: customers)
User.belongsToMany(Brand, { through: UserBrand, as: 'brands', foreignKey: 'userId' });
Brand.belongsToMany(User, { through: UserBrand, as: 'customers', foreignKey: 'brandId' });

// Brand - Product
Brand.hasMany(Product, { foreignKey: 'brandId' });
Product.belongsTo(Brand, { foreignKey: 'brandId' });

// User - Cart
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart - CartItems
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Product - CartItems
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// User - Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Brand - Order
Brand.hasMany(Order, { foreignKey: 'brandId' });
Order.belongsTo(Brand, { foreignKey: 'brandId' });

export {
  sequelize,
  User,
  Brand,
  Product,
  Cart,
  CartItem,
  Order,
  UserBrand
};
