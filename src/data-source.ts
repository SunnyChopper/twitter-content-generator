import "reflect-metadata";
import { DataSource } from "typeorm";

// TODO: Update the entities array with your own entities
import { TwitterFile } from "src/entity/TwitterFile";

// Get environment variables for database connection
// Load from .env file if running locally
// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }

const DB_PORT = parseInt(process.env.REACT_APP_DB_PORT || "3306");
const DB_HOST = process.env.REACT_APP_DB_HOST;
const DB_NAME = process.env.REACT_APP_DB_NAME;
const DB_USERNAME = process.env.REACT_APP_DB_USERNAME;
const DB_PASSWORD = process.env.REACT_APP_DB_PASSWORD;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [TwitterFile],
    migrations: [],
    subscribers: [],
});
