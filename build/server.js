"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const completable_js_1 = require("@modelcontextprotocol/sdk/server/completable.js");
const zod_1 = require("zod");
//database
const index_1 = require("./api/model/index");
//user
const user_controller_1 = require("./api/controller/user.controller");
const userController = new user_controller_1.UserController();
const server = new mcp_js_1.McpServer({
    name: "e-commerce-api-server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
        prompts: {},
    },
});
server.resource("users", "users://all", {
    description: "get all users from the database",
    title: "Users",
    mimeType: "application/json",
}, async (uri) => {
    const users = await userController.getAll();
    return {
        contents: [
            {
                uri: uri.href,
                text: JSON.stringify(users),
                mimeType: "application/json",
            },
        ],
    };
});
server.resource("user-details", new mcp_js_1.ResourceTemplate("users://{userId}/profile", { list: undefined }), {
    description: "get specific users from the database",
    title: "Users details",
    mimeType: "application/json",
}, async (uri, { userId }) => {
    const user = await userController.getUserById({ id: userId });
    if (!user || !user.status || !user.data) {
        return {
            contents: [
                {
                    uri: uri.href,
                    text: JSON.stringify({ error: "User not found" }),
                    mimeType: "application/json",
                },
            ],
        };
    }
    return {
        contents: [
            {
                uri: uri.href,
                text: JSON.stringify(user),
                mimeType: "application/json",
            },
        ],
    };
});
server.tool("create-user", "creating an user in the brand db", {
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string(),
}, {
    title: "Create-user",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
}, async (params, _extra) => {
    try {
        const userCreate = await userController.register(params);
        return {
            content: [
                {
                    type: "text",
                    text: `user created for user ${userCreate.name}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: "user creation failed",
                },
            ],
        };
    }
});
server.registerPrompt("team-greeting", {
    title: "Team Greeting",
    description: "Generating a greeting for team members",
    argsSchema: {
        department: (0, completable_js_1.completable)(zod_1.z.string(), (value) => {
            return ["enginnering", "sales", "marketing", "support"].filter((d) => d.startsWith(value));
        }),
        name: (0, completable_js_1.completable)(zod_1.z.string(), (value, context) => {
            const department = context?.arguments?.["department"];
            if (department === "engineering") {
                return ["Alice", "Bob", "Charlie"].filter((n) => n.startsWith(value));
            }
            else if (department === "sales") {
                return ["David", "Eve", "Frank"].filter((n) => n.startsWith(value));
            }
            else if (department === "marketing") {
                return ["Grace", "Henry", "Iris"].filter((n) => n.startsWith(value));
            }
            return ["Guest"].filter((n) => n.startsWith(value));
        }),
    },
}, ({ department, name }) => ({
    messages: [
        {
            role: "assistant",
            content: {
                type: "text",
                text: `Hello ${name}, welcome to the ${department} team!`,
            },
        },
    ],
}));
const main = async () => {
    try {
        await index_1.sequelize.authenticate();
        process.stderr.write("✅ DB connected\n");
        await index_1.sequelize.sync({ alter: false });
        process.stderr.write("✅ DB synced\n");
        const transport = new stdio_js_1.StdioServerTransport();
        await server.connect(transport);
    }
    catch (err) {
        process.stderr.write(`MCP server failed to start: ${err}\n`);
    }
};
main();
