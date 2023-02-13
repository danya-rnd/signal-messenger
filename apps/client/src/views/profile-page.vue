<template>
  <DefaultLayout>
    <div class="profile">
      <a-typography-title class="profile__title" :level="3"
        >Личный кабинет</a-typography-title
      >
      <a-form>
        <a-row>
          <a-col :span="2">
            <a-form-item>
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <div>
                  <plus-outlined></plus-outlined>
                  <div class="ant-upload-text">Загрузить фото</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="21" :offset="1">
            <a-form-item>
              <a-input
                :autocomplete="false"
                size="large"
                placeholder="Имя пользователя"
              >
                <template #prefix>
                  <user-outlined type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password size="large" placeholder="Пароль">
                <template #prefix>
                  <lock-outlined type="user" />
                </template>
              </a-input-password> </a-form-item
          ></a-col>
        </a-row>
        <a-form-item>
          <a-button type="primary" block>Обновить информацию</a-button>
        </a-form-item>
      </a-form>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from "../layouts/default-layout.vue";
</script>

<style lang="scss">
.profile {
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  margin-top: 1.5em;
  &__title {
    margin-bottom: 1em !important;
  }
}
</style>
