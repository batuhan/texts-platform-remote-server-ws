import { randomUUID } from "crypto";
import WebSocket from "ws";
import { Message, ServerEventType } from "../lib/types";
import { sendEventToEveryClient } from "../lib/ws";
import { db } from "../db";
import { messages } from "../db/schema";

export function connectToWSServer(serverURL: string) {
  const ws = new WebSocket(serverURL);
  ws.on("open", () => {
    console.log("connected to WebSocket server");

    setInterval(() => {
      ws.send("{text: `Hello, WebSocket server!`}");
    }, 10000);
  });

  ws.on("message", async (message) => {
    console.log(`Received message: ${message}`);
    const WSMessage: Message = {
      id: randomUUID(),
      senderID: "WS",
      threadID: "WS-Server",
      text: `\`\`\`\n${message}\n\`\`\``,
      timestamp: new Date(),
      isSender: false,
      seen: true,
      isDelivered: true,
    };

    await db.insert(messages).values([WSMessage]);

    sendEventToEveryClient({
      type: ServerEventType.STATE_SYNC,
      objectName: "message",
      mutationType: "upsert",
      objectIDs: { threadID: "WS-Server" },
      entries: [WSMessage],
    });
  });

  ws.on("close", () => {
    console.log("disconnected from WebSocket server");
  });
}
