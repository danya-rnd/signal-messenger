<template>
  <a-card
    class="chat-area chat-area_main"
    :bordered="false"
    v-if="chatStore.activeChatId"
  >
    <div id="message-list-overflowed" class="chat-area__messages">
      <div style="height: 100%"></div>
      <message
        v-for="message of chatStore.activeChatMessages"
        :key="message.id"
        :message="message"
        :messageType="'from'"
      ></message>
      <div
        class="chat-area__messages__empty"
        v-if="chatStore.activeChatMessages.length === 0"
      >
        <a-typography-text class="chat-area__messages__empty__notify"
          >История сообщений пуста</a-typography-text
        >
      </div>
    </div>
    <a-form @submit="onMessageSend">
      <a-row class="chat-area__input">
        <a-col :span="20">
          <a-input
            v-model:value="inputValue"
            size="large"
            placeholder="Введите ваше сообщение"
          ></a-input>
        </a-col>
        <a-col :offset="1" :span="3">
          <a-button
            type="primary"
            size="large"
            block
            @click.prevent="onMessageSend"
            ><send-outlined></send-outlined
          ></a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <a-card
    v-else
    class="chat-area chat-area_empty"
    :bodyStyle="{
      padding: '.5em 1em',
      borderRadius: '5px',
    }"
    :bordered="false"
  >
    <a-typography-text class="chat-area__notify"
      >Выберите чат, чтобы начать переписку</a-typography-text
    >
  </a-card>
</template>

<script lang="ts" setup>
import { useChatStore } from "@/store/chat.store";
import { SendOutlined } from "@ant-design/icons-vue";
import Message from "./message.vue";

import { ref, onMounted, watch } from "vue";

const inputValue = ref("");
const isPending = ref(false);

const chatStore = useChatStore();

const onMessageSend = async () => {
  try {
    isPending.value = true;
    await chatStore.sendMessage(inputValue.value);
    inputValue.value = "";
  } catch (err) {
    throw err;
  } finally {
    isPending.value = false;
  }
};

const scrollDown = () => {
  const messageAreaDiv = document.getElementById("message-list-overflowed");
  if (messageAreaDiv) {
    messageAreaDiv.scrollTop = messageAreaDiv.scrollHeight;
  }
};

watch(
  () => chatStore.activeChatMessages,
  () => {
    setTimeout(() => {
      scrollDown();
    });
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss">
.chat-area {
  position: absolute;
  width: 100%;
  height: 100%;
  .ant-card-body {
    min-height: 100%;
    padding: 0;
  }
  &_main {
    display: flex;
    flex-direction: column;
  }
  &_empty {
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-card-body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__messages {
    display: flex;
    flex-direction: column;
    padding: 1.3em 2em;
    height: calc(100% - 80px);
    overflow-y: scroll;
    &__empty {
      &__notify {
        color: #bfbfbf;
        display: block;
        text-align: center;
      }
    }
  }
  &__divider {
    margin: 0;
  }
  &__input {
    max-height: 80px;
    padding: 1.3em 2em;
    height: 100%;
    border-top: 1px solid #cccccc;
  }
}
</style>
