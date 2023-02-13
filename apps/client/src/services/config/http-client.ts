import axios from "axios";

export class HttpClient {
  public readonly client = axios.create({
    baseURL: "/api/v1/",
  });
}
