<template>
  <a-layout>
    <a-layout-content class="login-page">
      <auth-login
        v-if="currentView == 'login'"
        @onViewUpdate="currentView = $event"
      ></auth-login>
      <auth-register
        v-if="currentView == 'register'"
        @onViewUpdate="currentView = $event"
      ></auth-register>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import AuthLogin from "@/components/login/auth-login.vue";
import AuthRegister from "@/components/login/auth-register.vue";
import { ref } from "vue";

const currentView = ref<"login" | "register">("login");
</script>

<style lang="scss">
.login-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/yang-deng-unsplash.webp");
  background-size: cover;
  background-repeat: no-repeat;
}
.login-card {
  max-width: 400px;
  width: 100%;
  &__title {
    text-align: center;
  }
  &__footer {
    text-align: center;
    &__desc {
      margin: 0 !important;
      &_link {
        color: #1890ff;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
