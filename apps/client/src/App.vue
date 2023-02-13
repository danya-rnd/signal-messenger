<template>
  <router-view v-if="isReady"></router-view>
  <div class="loader" v-else>
    <a-spin size="large"></a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useUserStore } from "./store/user.store";

const isReady = ref(false);
const router = useRouter();

onBeforeMount(() => {
  const userStore = useUserStore();
  userStore.getProfile().finally(() => (isReady.value = true));
});
</script>

<style lang="scss">
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
