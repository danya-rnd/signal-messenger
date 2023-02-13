import { defineStore } from "pinia";
import { ref } from "vue";

import { authService, UserCreds } from "@/services/auth.service";
import { IUser, usersService } from "@/services/users.service";

const getInitialUser = (): IUser & { isLoggedIn: boolean } => ({
  id: NaN,
  username: "",
  avatar: "",
  isLoggedIn: false,
});

export const useUserStore = defineStore("user", {
  state: () => ({
    user: ref<IUser & { isLoggedIn: boolean }>(getInitialUser()),
  }),
  actions: {
    async signIn(user: UserCreds) {
      try {
        const response = await authService.signIn(user);
        if (response.status == 201) {
          Object.assign(this.user, {
            ...response.data,
            isLoggedIn: true,
          });
        }
        return {
          message: "Вы успешно авторизовались!",
          status: true,
        };
      } catch (err) {
        throw err;
      }
    },
    async loogut() {
      try {
        await authService.logout();
        this.user = getInitialUser();
      } catch (err) {
        throw err;
      }
    },
    async getProfile() {
      try {
        const { data } = await usersService.fetchMe();
        Object.assign(this.user, {
          ...data,
          isLoggedIn: true,
        });
      } catch (err) {
        throw err;
      }
    },
  },
});
