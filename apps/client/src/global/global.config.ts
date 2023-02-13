import { ChatGateway } from "@/services/chat.gateway";

interface GlobalConfig {
  gateway: ChatGateway | null;
}

export default <GlobalConfig>{
  gateway: null,
};
