<template>
  <a-card class="login-card">
    <template #title>
      <a-typography-title class="login-card__title" :level="4"
        >Добро пожаловать</a-typography-title
      >
    </template>
    <a-form @submit="onLogin">
      <a-form-item v-bind="validateInfos.username">
        <a-input
          v-model:value="user.username"
          size="large"
          placeholder="Имя пользователя"
        >
          <template #prefix>
            <user-outlined type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password">
        <a-input-password
          v-model:value="user.password"
          size="large"
          placeholder="Пароль"
        >
          <template #prefix>
            <lock-outlined type="user" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          @click.prevent="onLogin"
          :loading="inProgress"
          type="primary"
          block
          >Войти</a-button
        >
      </a-form-item>
      <div class="login-card__footer">
        <a-typography-paragraph class="login-card__footer__desc" :level="4"
          >У вас нет аккаунта?</a-typography-paragraph
        >
        <a-typography-paragraph
          class="login-card__footer__desc login-card__footer__desc_link"
          @click.stop="emit('onViewUpdate', 'register')"
          :level="4"
          >Зарегистрироваться</a-typography-paragraph
        >
      </div>
    </a-form>
  </a-card>
</template>

<script lang="ts" setup>
import { UserCreds } from "@/services/auth.service";
import { useUserStore } from "@/store/user.store";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;
const user = reactive<UserCreds>({
  username: "",
  password: "",
});

const emit = defineEmits(["onViewUpdate"]);

const { validate, validateInfos } = useForm(
  user,
  reactive({
    username: [
      {
        required: true,
        message: "Пожалуйста введите верный логин",
      },
    ],
    password: [
      {
        required: true,
        message: "Пожалуйста введите верный пароль",
      },
    ],
  })
);

const inProgress = ref(false);

const router = useRouter();
const userStore = useUserStore();

const onLogin = async () => {
  try {
    await validate();
    inProgress.value = true;
    const { status } = await userStore.signIn(user);
    if (status) {
      router.push("/");
    }
  } catch (err) {
    validateInfos.username.validateStatus = "error";
    validateInfos.password.validateStatus = "error";
  } finally {
    inProgress.value = false;
  }
};
</script>
