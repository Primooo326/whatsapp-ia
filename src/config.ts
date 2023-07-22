import dotenv from "dotenv";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const APIKEY: string = process.env.APIKEY || "YOUR_API_KEY";


const config = {
    PORT,
    APIKEY,
};
console.log(config)

export default config;
