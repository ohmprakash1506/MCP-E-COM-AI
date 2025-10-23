import dotenv from 'dotenv';
dotenv.config();

export const ENV: any = {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'database',

    OLLAMA_HOST: process.env.OLLAMA_URL,
    OLLAMA_MODEL: process.env.OLLAMA_MODEL,
    OLLAMA_SYSTEM_PROMPT: process.env.OLLAMA_SYSTEM_PROMPT
}