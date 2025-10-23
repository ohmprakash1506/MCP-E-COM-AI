import { Ollama } from "ollama";

import { ChatMessage } from "../types/types";

import { ENV } from "../config/env.config";

export class OllamaService {
    private ollama: Ollama;
    private conversationalHistory: ChatMessage[] = []

    constructor(){
        this.ollama = new Ollama({
            host: ENV.OLLAMA_HOST
        })
    }

    public getUserQuery : any = async (query: any) => {
        let responseContent: any = ""

        const stream: any = await this.ollama.chat({
            model: ENV.OLLAMA_MODEL,
            messages:[
                ...this.conversationalHistory,
                {role: "sytem", content: ENV.OLLAMA_SYSTEM_PROMPT },
                {role:"user", content: query}
            ],
            stream: true
        }) ;

        for await (const chunk of stream) {
            
        }
    } 


}