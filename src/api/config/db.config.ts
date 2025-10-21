import { Sequelize } from "sequelize";
import { ENV } from "./env.config";

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
