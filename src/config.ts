import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const APIKEY = process.env.APIKEY || "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";
export default {PORT, APIKEY}