import { TOKEN } from "./keys";

export const setToken = (token: string): void =>
  localStorage.setItem(TOKEN, token);

export const getToken = (): string | null => localStorage.getItem(TOKEN);

export const deleteToken = () => localStorage.setItem(TOKEN, "");
