import { TOKEN, USERNAME } from './keys'

export const setToken = (token: string): void => localStorage.setItem(TOKEN, token)

export const getToken = (): string | null => localStorage.getItem(TOKEN)

export const deleteToken = () => localStorage.setItem(TOKEN, '')

export const setUserName = (fname: string): void => localStorage.setItem(USERNAME, fname)
export const getUserName = (): string | null => localStorage.getItem(USERNAME)
export const deleteUserName = () => localStorage.setItem(USERNAME, '')
