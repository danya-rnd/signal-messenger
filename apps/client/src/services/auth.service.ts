import { HttpClient } from "@/services/config/http-client";
import { IUser } from "./users.service";

export interface UserCreds {
  username: string;
  password: string;
  avatar?: null | File;
}

class AuthService extends HttpClient {
  signIn(user: UserCreds) {
    return this.client.post<IUser>("/auth/sign-in", user);
  }

  signup(user: UserCreds) {
    return this.client.post("/auth/sign-up", user);
  }

  logout() {
    return this.client.post("/auth/logout");
  }
}

export const authService = new AuthService();
