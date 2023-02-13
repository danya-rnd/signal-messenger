<template>
  <a-row class="message" type="flex" align="top" :justify="justify">
    <a-col :span="20">
      <a-row :gutter="10">
        <a-col flex="50px" :order="order[0]">
          <a-avatar class="header-avatar" size="large">
            <template #icon>
              <user-outlined />
            </template>
          </a-avatar>
        </a-col>
        <a-col
          class="message__box"
          :class="{ message__box_end: justify == 'end' }"
          :span="22"
          :order="order[1]"
        >
          <a-typography-text
            class="message__text"
            :class="{
              message__text_from: justify === 'start',
              message__text_to: justify === 'end',
            }"
            :content="message.content"
          ></a-typography-text>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { IMessage } from "@/services/chat.service";
import { useUserStore } from "@/store/user.store";
import { UserOutlined } from "@ant-design/icons-vue";
import { computed } from "@vue/reactivity";

interface Props {
  message: IMessage;
}

const props = defineProps<Props>();
const userStore = useUserStore();

const justify = computed(() => {
  if (props.message.userId === userStore.user.id) return "end";
  return "start";
});

const order = computed(() => {
  switch (justify.value) {
    case "start":
      return [1, 2];
    case "end":
      return [2, 1];
    default:
      return [1, 2];
  }
});
</script>

<style lang="scss">
.message {
  margin-bottom: 0.7em;
  &__text {
    display: block;
    white-space: pre-line;
    width: max-content;
    padding: 0.8em;
    box-sizing: border-box;
    &_from {
      border-radius: 5px 5px 5px 5px;
      background: rgba(59, 130, 246, 0.2);
    }
    &_to {
      border-radius: 5px 5px 5px 5px;
      background: rgba(204, 204, 204, 0.3);
    }
  }
  &__box {
    &_end {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
