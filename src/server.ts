import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";
import { z } from "zod";

//database
import { sequelize } from "./api/model/index";

//user
import { UserController } from "./api/controller/user.controller";

const userController = new UserController();

const server = new McpServer({
  name: "e-commerce-api-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
});

server.resource(
  "users",
  "users://all",
  {
    description: "get all users from the database",
    title: "Users",
    mimeType: "application/json",
  },
  async (uri) => {
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
  }
);

server.resource(
  "user-details",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  {
    description: "get specific users from the database",
    title: "Users details",
    mimeType: "application/json",
  },
  async (uri, { userId }) => {
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
  }
);

server.tool(
  "create-user",
  "creating an user in the brand db",
  {
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
  },
  {
    title: "Create-user",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async (params, _extra) => {
    try {
      const userCreate: any = await userController.register(params);
      return {
        content: [
          {
            type: "text",
            text: `user created for user ${userCreate.name}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "user creation failed",
          },
        ],
      };
    }
  }
);

server.registerPrompt(
  "team-greeting",
  {
    title: "Team Greeting",
    description: "Generating a greeting for team members",
    argsSchema: {
      department: completable(z.string(), (value) => {
        return ["enginnering", "sales", "marketing", "support"].filter((d) =>
          d.startsWith(value)
        );
      }),
      name: completable(z.string(), (value, context) => {
        const department = context?.arguments?.["department"];
        if (department === "engineering") {
          return ["Alice", "Bob", "Charlie"].filter((n) => n.startsWith(value));
        } else if (department === "sales") {
          return ["David", "Eve", "Frank"].filter((n) => n.startsWith(value));
        } else if (department === "marketing") {
          return ["Grace", "Henry", "Iris"].filter((n) => n.startsWith(value));
        }
        return ["Guest"].filter((n) => n.startsWith(value));
      }),
    },
  },
  ({ department, name }) => ({
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: `Hello ${name}, welcome to the ${department} team!`,
        },
      },
    ],
  })
);

const main = async () => {
  try {
    await sequelize.authenticate();
    process.stderr.write("✅ DB connected\n");
    await sequelize.sync({ alter: false });
    process.stderr.write("✅ DB synced\n");

    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (err) {
    process.stderr.write(`MCP server failed to start: ${err}\n`);
  }
};

main();
