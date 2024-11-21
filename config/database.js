const { Sequelize } = require("sequelize");
const { ENVIRONMENT, DATABASE } = require("../constants/constants");

const isProduction = process.env.NODE_ENV === ENVIRONMENT.PROD_ENV;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

sequelize
  .authenticate()
  .then(() => {
    console.log(DATABASE.MESSAGES.SUCCESS_MESSAGE);
  })
  .catch((err) => {
    console.error(DATABASE.MESSAGES.ERROR_MESSAGE, err);
  });

module.exports = sequelize;
