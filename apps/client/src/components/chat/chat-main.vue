<template>
  <a-row class="chat-main" justify="" align="top">
    <a-col class="chat-main__chats" :span="7">
      <chat-list></chat-list>
    </a-col>
    <a-col class="chat-main__area" :span="17">
      <chat-area></chat-area>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, onMounted } from "vue";

import ChatList from "./chat-list/chat-list.vue";
import ChatArea from "./chat-area/chat-area.vue";
import { useChatStore } from "@/store/chat.store";
import { ChatGateway } from "@/services/chat.gateway";
import config from "@/global/global.config";

const chatStore = useChatStore();
const isChatsMounted = ref(false);

onBeforeMount(async () => {
  await chatStore.fetchChats().finally(() => {
    isChatsMounted.value = true;
  });
});

onMounted(() => {
  config.gateway = new ChatGateway();
});
</script>

<style lang="scss" scoped>
.chat-main {
  height: 100%;
  &__chats {
    position: relative;
    min-height: 100%;
    border-right: 1px solid #ccc;
  }
  &__area {
    position: relative;
    min-height: 100%;
  }
}
</style>
