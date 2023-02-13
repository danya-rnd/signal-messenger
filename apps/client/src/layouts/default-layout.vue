<template>
  <!-- <a-layout theme="light" v-if="dims.width >= 1368 && dims.height >= 768"> -->
  <a-layout theme="light">
    <TheHeader />
    <a-layout-content class="content-layout">
      <slot></slot>
    </a-layout-content>
  </a-layout>
  <!-- <a-layout v-else></a-layout> -->
  <a-layout>
    <a-layout-content class="block-content">
      <a-typography-paragraph
        class="block-content__paragraph"
        content="К сожалению, мессенджер сейчас доступен только на экранах с разрешением не менее 1366x768."
      />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount } from "vue";
import TheHeader from "../components/the-header.vue";

const dims = reactive({
  width: 0,
  height: 0,
});

function readDims() {
  dims.width = window.innerWidth;
  dims.height = window.innerHeight;
}

onMounted(() => {
  readDims();
  window.onresize = () => {
    readDims();
  };
});

onBeforeUnmount(() => {
  window.onresize = null;
});
</script>

<style lang="scss">
* {
  &::-webkit-scrollbar {
    width: 6px;
    overflow: visible;
  }

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border-right: 1px solid #ffffff;
    border-radius: 3px;
    background-clip: content-box;
  }
}

body {
  overflow: hidden;
  min-height: 100vh;
}

.content-layout {
  background: #ffffff;
  height: calc(100vh - 74px);
}

.block-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &__paragraph {
    max-width: 400px;
    text-align: center;
  }
}
</style>
