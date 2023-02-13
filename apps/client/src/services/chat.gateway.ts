import { useChatStore } from "@/store/chat.store";
import { io } from "socket.io-client";
import { IMessage } from "./chat.service";

export interface MessageRequest {
  roomId: number;
  content: string;
}

export class ChatGateway {
  private readonly client = io("ws://localhost:3000/api/v1/chat-socket", {
    path: "/api/v1/chat-socket",
    reconnectionDelayMax: 1000,
    withCredentials: true,
  });

  constructor() {
    this.client.on("message", (data: IMessage) => {
      const chatStore = useChatStore();
      chatStore.saveMessage(data);
    });
  }

  sendMessage(payload: MessageRequest): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      this.client.on("message-response", (data) => {
        resolve(data);
      });
      this.client.emit("message", payload);
      setTimeout(() => {
        reject(new Error("Timeout error"));
      }, 15000);
    });
  }
}
