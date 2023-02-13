<template>
  <div class="chat-list">
    <!-- <a-card class="chat-list__header" :bordered="false">
      <a-input placeholder="Поиск по чатам">
        <template #prefix>
          <search-outlined />
        </template>
      </a-input>
    </a-card> -->
    <a-card
      class="chat-list__row"
      :bodyStyle="{ padding: '0px' }"
      :bordered="false"
    >
      <chat-list-card
        v-for="card in chatStore.chats"
        :key="card.id"
        :card="card"
      ></chat-list-card>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { useChatStore } from "@/store/chat.store";

import ChatListCard from "./chat-list-card.vue";

const chatStore = useChatStore();
</script>

<style lang="scss" setup>
.chat-list {
  position: absolute;
  width: 100%;
  height: 100%;
  &__header {
    position: relative;
    border-bottom: 1px solid #ccc;
  }
  &__row {
    max-height: 100%;
    // max-height: calc(100% - 80px);
    position: relative;
    // overflow-y: hidden;
    height: auto;
    // &:hover {
    overflow-y: overlay;
    // }
  }
}
</style>
