import { config as loadENVs } from "dotenv";
loadENVs();

export const config = {
  development: {
    MYSQL_SETTINGS: {
      HOST: process.env.DEV_DB_HOST,
      DATABASE: process.env.DEV_DATABASE,
      USER: process.env.DEV_USER,
      PASSWORD: process.env.DEV_PASSWORD,
      PORT: process.env.DEV_PORT,
      DIALECT: process.env.DEV_DIALECT
    }
  }
};
