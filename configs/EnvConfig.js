import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

export const {APP_PORT}= process.env;
export const {VIEW_PORT}= process.env;
export const { BASE_STORAGE_NAME }= process.env;