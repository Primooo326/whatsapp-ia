import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const APIKEY = process.env.APIKEY || "YOUR_API_KEY";
export default {PORT, APIKEY}