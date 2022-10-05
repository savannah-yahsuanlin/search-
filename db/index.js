const Sequelize = require("sequelize");
const { UUID, UUIDV4, ENUM, STRING, DECIMAL, INTEGER } = Sequelize;

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_products_db"
);

const Product = conn.define("prodcut", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  rating: {
    type: ENUM("GREAT", "OK", "MEH"),
    defaultValue: "OK",
    allowNull: false,
    validate: {
      isIn: [["GREAT", "OK", "MEH"]],
    },
  },
  name: {
    type: STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 21],
    },
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      isPositive: (value) => {
        if(value <=0) {
          throw 'price must be positive'
        } 
      }
    }
  },
  numberInStock: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true
    }
  }
});
const seed = () => {
  return Promise.all([
    Product.create({ name: 'foo', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'bar', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'bazz', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'quq', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'fizz', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'buzz', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'arp', price: 2.99, numberInStock: 7}),

  ]);
};

module.exports = {
  conn,
  seed,
  Product
};
