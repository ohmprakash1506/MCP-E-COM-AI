"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaService = void 0;
const ollama_1 = require("ollama");
const env_config_1 = require("../config/env.config");
class OllamaService {
    ollama;
    conversationalHistory = [];
    constructor() {
        this.ollama = new ollama_1.Ollama({
            host: env_config_1.ENV.OLLAMA_HOST,
        });
    }
    getUserQuery = async (query) => {
        let responseContent = "";
        const stream = await this.ollama.chat({
            model: env_config_1.ENV.OLLAMA_MODEL,
            messages: [
                ...this.conversationalHistory,
                { role: "sytem", content: env_config_1.ENV.OLLAMA_SYSTEM_PROMPT },
                { role: "user", content: query },
            ],
            stream: true,
        });
        for await (const chunk of stream) {
            if (chunk.message?.content) {
                responseContent += chunk.message.content;
            }
        }
        this.conversationalHistory.push({ role: "user", content: query }, { role: "assistant", content: responseContent });
        return responseContent;
    };
}
exports.OllamaService = OllamaService;
