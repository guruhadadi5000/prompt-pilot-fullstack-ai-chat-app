import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import type {
  ApiResponse,
  AppContextValue,
  Chat,
  Theme,
  User,
} from "../types/app";

const serverUrl = import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = serverUrl;

const AppContext = createContext<AppContextValue | null>(null);

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  return stored === "dark" ? "dark" : "light";
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Something went wrong";
};

const authHeaders = (token: string | null) =>
  token ? { Authorization: token } : {};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token") || null,
  );
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.get<ApiResponse>("/api/users/data", {
        headers: authHeaders(token),
      });

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        toast.error(data.message ?? "Failed to load user");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoadingUser(false);
    }
  }, [token]);

  const fetchUsersChat = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.get<ApiResponse>("/api/chat/get", {
        headers: authHeaders(token),
      });

      if (!data.success || !data.chats) {
        toast.error(data.message ?? "Failed to load chats");
        return;
      }

      setChats(data.chats);

      if (data.chats.length === 0) {
        await axios.get("/api/chat/create", { headers: authHeaders(token) });
        const { data: refreshed } = await axios.get<ApiResponse>(
          "/api/chat/get",
          { headers: authHeaders(token) },
        );
        if (refreshed.success && refreshed.chats?.length) {
          setChats(refreshed.chats);
          setSelectedChat(refreshed.chats[0]);
        }
        return;
      }

      setSelectedChat(data.chats[0]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [token]);

  const createNewChat = useCallback(async () => {
    if (!user) {
      toast("Login to create a new chat");
      return;
    }
    if (!token) return;

    try {
      navigate("/");
      await axios.get("/api/chat/create", { headers: authHeaders(token) });
      await fetchUsersChat();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [user, token, navigate, fetchUsersChat]);

  useEffect(() => {
    if (token) {
      setLoadingUser(true);
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token, fetchUser]);

  useEffect(() => {
    if (user && token) {
      fetchUsersChat();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user, token, fetchUsersChat]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value: AppContextValue = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    fetchUsersChat,
    token,
    setToken,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
