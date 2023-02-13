<template>
  <a-card
    @click="chatStore.updateActiveChatId(card.id)"
    class="chat-list-card"
    :class="{ 'chat-list-card_active': chatStore.activeChatId === card.id }"
    :bodyStyle="{
      padding: '1em .2em',
    }"
    :bordered="false"
  >
    <a-row type="flex" align="center" justify="stretch">
      <a-col :span="3" class="chat-list-card__avatar">
        <a-avatar size="large">
          <template #icon>
            <user-outlined />
          </template> </a-avatar
      ></a-col>
      <a-col :offset="1" :span="18">
        <a-typography-title class="chat-list-card__name" :level="5">{{
          senderName
        }}</a-typography-title>
        <a-typography-text
          class="chat-list-card__text"
          :ellipsis="true"
          :content="lastMessage"
        ></a-typography-text>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
import { IChat } from "@/services/chat.service";
import { useChatStore } from "@/store/chat.store";
import { useUserStore } from "@/store/user.store";
import { UserOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";

interface Props {
  card: IChat;
}

const chatStore = useChatStore();
const userStore = useUserStore();

const { card } = defineProps<Props>();

const senderName = computed<string>(() => {
  const member = card.chatRoomMembers.find(
    (n) => n.user.id !== userStore.user.id
  );
  if (member) return member.user.username;
  return "Инкогнито";
});

const lastMessage = computed<string>(() => {
  const message = card.messages[card.messages.length - 1];
  if (message) return message.content;
  return "История сообщений пуста";
});
</script>

<style lang="scss" scoped>
.chat-list-card {
  position: relative;
  border-bottom: 1px solid #cccccc;
  transition: 0.1s;
  &:hover {
    background: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
  &_active {
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      height: 100%;
      width: 4px;
      background-color: rgb(59 130 246 / 0.5);
    }
  }
  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__name {
    margin-bottom: 0.2em;
  }
}
</style>
