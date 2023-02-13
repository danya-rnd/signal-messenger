import { HttpClient } from "@/services/config/http-client";

export interface IUser {
  id?: number;
  username: string;
  avatar: string;
}

class UsersService extends HttpClient {
  fetchMe() {
    return this.client.get<IUser>("/users/me");
  }
}

export const usersService = new UsersService();
