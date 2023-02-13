<template>
  <a-layout-header bordered class="header-light">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col :span="4">
        <a-typography-title :level="2">IosavaChat</a-typography-title>
      </a-col>
      <a-col :span="12">
        <a-input size="large" placeholder="Поиск" class="search-field">
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-col>
      <a-col :offset="3" flex="40px">
        <a-popover trigger="click" placement="topLeft">
          <template #title>
            <a-typography-title
              :level="5"
              style="margin-bottom: 0px; padding: 0.2em 0"
              >{{ userStore.user.username }}</a-typography-title
            >
          </template>
          <template #content>
            <a-list size="small" style="width: 200px">
              <a-list-item class="header-link" @click="goProfile"
                >Мой профиль</a-list-item
              >
              <a-list-item class="header-link" @click="onLogout"
                >Выход</a-list-item
              >
            </a-list>
          </template>
          <a-avatar class="header-avatar" size="large">
            <template #icon>
              <user-outlined />
            </template>
          </a-avatar>
        </a-popover>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user.store";
import { SearchOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const goProfile = () => {
  router.push("/profile");
};

const onLogout = async () => {
  try {
    await userStore.loogut();
    router.push("/login");
  } catch (err) {}
};
</script>

<style lang="scss">
.header-light {
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  height: 74px;
  h2.ant-typography {
    margin-bottom: 0;
  }

  .ant-row {
    height: 100%;
  }

  .search-field {
    background: #ededed;
    .ant-input {
      background: #ededed;
      color: #000;
      &::placeholder {
        color: #000;
      }
    }
  }
  .header-avatar {
    cursor: pointer;
  }
}
.ant-popover-inner-content {
  padding: 0;
  .header-link {
    cursor: pointer;
    transition: 0.1s;
    &:hover {
      background: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
