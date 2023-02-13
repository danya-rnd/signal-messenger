import { HttpClient } from "@/services/config/http-client";
import { IUser } from "./users.service";

export interface IMessage {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  roomId: number;
  userId: number;
}

export interface IChat {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  messages: IMessage[];
  chatRoomMembers: { user: IUser }[];
}

class ChatService extends HttpClient {
  fetchChats() {
    return this.client.get("/chat/rooms");
  }
  createChat(userId: number) {
    return this.client.post("/chat/create-room", { userId });
  }
}

export const chatService = new ChatService();
