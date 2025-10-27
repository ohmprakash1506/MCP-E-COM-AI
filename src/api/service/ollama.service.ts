import { Ollama } from "ollama";

import { ChatMessage } from "../types/types";

import { ENV } from "../config/env.config";

export class OllamaService {
  private ollama: Ollama;
  private conversationalHistory: ChatMessage[] = [];

  constructor() {
    this.ollama = new Ollama({
      host: ENV.OLLAMA_HOST,
    });
  }

  public getUserQuery: any = async (query: any) => {
    try {
      let responseContent: any = "";

      const stream: any = await this.ollama.chat({
        model: ENV.OLLAMA_MODEL,
        messages: [
          ...this.conversationalHistory,
          { role: "sytem", content: ENV.OLLAMA_SYSTEM_PROMPT },
          { role: "user", content: query },
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        if (chunk.message?.content) {
          responseContent += chunk.message.content;
        }
      }

      this.conversationalHistory.push(
        { role: "user", content: query },
        { role: "assistant", content: responseContent }
      );

      return responseContent;
    } catch (error: any) {
      process.stderr.write(`Error in ollama: ${error} \n`);
    }
  };
}
