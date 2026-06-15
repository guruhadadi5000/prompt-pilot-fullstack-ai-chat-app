import type { AxiosInstance } from "axios";
import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";

export type Theme = "light" | "dark";

export interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  createdAt?: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | string;
  content: string;
  timestamp: number;
  isImage: boolean;
  isPublished?: boolean;
}

export interface Chat {
  _id: string;
  userId: string;
  userName: string;
  name: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  user?: User;
  chats?: Chat[];
  token?: string;
  plans?: unknown[];
  images?: PublishedImage[];
  url?: string;
  reply?: ChatMessage;
}

export interface PublishedImage {
  imageUrl: string;
  userName: string;
}

export interface AppContextValue {
  navigate: NavigateFunction;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
  selectedChat: Chat | null;
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  createNewChat: () => Promise<void>;
  loadingUser: boolean;
  fetchUsersChat: () => Promise<void>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  axios: AxiosInstance;
}
