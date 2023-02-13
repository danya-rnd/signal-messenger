import { MessageRequest } from "@/services/chat.gateway";
import { chatService, IChat, IMessage } from "@/services/chat.service";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import config from "@/global/global.config";

export const useChatStore = defineStore("chat", {
  state: () => ({
    activeChatId: ref<number>(NaN),
    chats: reactive<IChat[]>([]),
  }),
  getters: {
    // prettier-ignore
    activeChatMessages: (state) => state.chats.find((n) => n.id === state.activeChatId)?.messages ?? [],
  },
  actions: {
    async fetchChats() {
      const { data } = await chatService.fetchChats();
      this.chats = data;
    },
    updateActiveChatId(chatId: number) {
      this.activeChatId = chatId;
    },
    async sendMessage(payloadMessage: string) {
      try {
        if (config.gateway) {
          const message = await config.gateway.sendMessage({
            roomId: this.activeChatId,
            content: payloadMessage,
          });
          if (message) {
            this.saveMessage(message);
          }
        }
      } catch (err) {
        throw err;
      }
    },
    saveMessage(message: IMessage) {
      const currentChat = this.chats.find((n) => n.id === this.activeChatId);
      if (currentChat) currentChat.messages.push(message);
    },
  },
});
