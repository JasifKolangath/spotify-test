import Cookie from "js-cookie";
import Router from "next/router";

const TOKEN_STORAGE_KEY = "App.AT";

export class AuthToken {
  static async storeToken(token) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
    await Router.push("/album");
  }

  static getToken() {
    return Cookie.get(TOKEN_STORAGE_KEY);
  }

  static async clearToken() {
    localStorage.clear()
    Cookie.remove(TOKEN_STORAGE_KEY);
    await Router.push("/");
  }
}
