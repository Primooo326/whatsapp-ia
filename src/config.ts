import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const APIKEY = process.env.APIKEY || "APIKEY";
export default {PORT, APIKEY}