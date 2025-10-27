import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import {
  CreateMessageRequestSchema,
  Prompt,
  PromptMessage,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { OllamaService } from "./api/service/ollama.service";

import { ENV } from "./api/config/env.config";

const mcp = new Client(
  {
    name: "e-com-client",
    version: "1.0.0",
  },
  {
    capabilities: {
      sampling: {},
    },
  }
);

class ClientInitialization {

    private mcpClient: Client;
    private ollama: OllamaService;
    private availableTools: Tool[] = [];
    private availableResources: any = [];

    constructor() {
        this.mcpClient = mcp
        this.ollama = new OllamaService()
    }

    public initialization = async () => {
        try {

            const transport = new StdioClientTransport({
            command: "node",
            args: ["build/server.js"],
            stderr: "ignore",
            });
            await this.mcpClient.connect(transport)
             process.stderr.write("Connected to MCP server\n");

            const [{ tools }, { resources }] = await Promise.all([
            this.mcpClient.listTools(),
            this.mcpClient.listResources(),
            ]);

            this.availableTools= tools;
            this.availableResources= resources;

            process.stderr.write(`Loaded ${tools.length} tools`);
            process.stderr.write(`Loaded ${resources.length} resources`);
        } catch (error) {
          process.stderr.write(`MCP server failed to start: ${error}\n`);
        }
    } 

    public chatOllama = async(userQuery: string): Promise<string> => {
        try {
            const chatResponse = await this.ollama.getUserQuery(userQuery)

            return chatResponse
        } catch (error) {
            process.stderr.write(`MCP AI connection issue: ${error}\n`);
            throw error;
        }
    }
}

const main = async() => {
    const client = new ClientInitialization()

    try {
        await client.initialization()

        const response_1: any = await client.chatOllama("how are you")

        process.stderr.write(`AI response 1: ${response_1}\n`)

        const response_2: any = await client.chatOllama("What is your name")

        process.stderr.write(`AI response 1: ${response_2}\n`)
    } catch (error) {
        process.stderr.write(`MCP client connection issue: ${error}\n`);
    }
}

main()