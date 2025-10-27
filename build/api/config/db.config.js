"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_config_1 = require("./env.config");
const sequelize = new sequelize_1.Sequelize(env_config_1.ENV.DB_NAME, env_config_1.ENV.DB_USER, env_config_1.ENV.DB_PASSWORD, {
    host: env_config_1.ENV.DB_HOST,
    dialect: "postgres",
    logging: false,
});
exports.default = sequelize;
