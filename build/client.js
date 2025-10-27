"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const ollama_service_1 = require("./api/service/ollama.service");
const mcp = new index_js_1.Client({
    name: "e-com-client",
    version: "1.0.0",
}, {
    capabilities: {
        sampling: {},
    },
});
class ClientInitialization {
    mcpClient;
    ollama;
    availableTools = [];
    availableResources = [];
    constructor() {
        this.mcpClient = mcp;
        this.ollama = new ollama_service_1.OllamaService();
    }
    initialization = async () => {
        try {
            const transport = new stdio_js_1.StdioClientTransport({
                command: "node",
                args: ["ts-node", "src/server.ts"],
                stderr: "ignore",
            });
            await this.mcpClient.connect(transport);
            process.stderr.write("Connected to MCP server\n");
            const [{ tools }, { resources }] = await Promise.all([
                this.mcpClient.listTools(),
                this.mcpClient.listResources(),
            ]);
            this.availableTools = tools;
            this.availableResources = resources;
            process.stderr.write(`Loaded ${tools.length} tools`);
            process.stderr.write(`Loaded ${resources.length} resources`);
        }
        catch (error) {
            process.stderr.write(`MCP server failed to start: ${error}\n`);
        }
    };
    chatOllama = async (userQuery) => {
        try {
            const chatResponse = await this.ollama.getUserQuery(userQuery);
            return chatResponse;
        }
        catch (error) {
            process.stderr.write(`MCP server failed to start: ${error}\n`);
            throw error;
        }
    };
}
const main = async () => {
    const client = new ClientInitialization();
    try {
        await client.initialization();
    }
    catch (error) {
        process.stderr.write(`MCP client connection issue: ${error}\n`);
    }
};
main();
