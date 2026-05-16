/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

import type { ReactNode } from "react";

import type {
  User,
} from "../types/auth.types";

// CONTEXT TYPE
interface AuthContextType {
  user: User | null;

  token: string | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

// CREATE CONTEXT
const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

// PROVIDER PROPS
interface AuthProviderProps {
  children: ReactNode;
}

// GET INITIAL TOKEN
const getInitialToken = () => {
  return localStorage.getItem(
    "token"
  );
};

// GET INITIAL USER
const getInitialUser = () => {
  const storedUser =
    localStorage.getItem("user");

  return storedUser
    ? JSON.parse(storedUser)
    : null;
};

// AUTH PROVIDER
export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [token, setToken] =
    useState<string | null>(
      getInitialToken()
    );

  const [user, setUser] =
    useState<User | null>(
      getInitialUser()
    );

  // LOGIN
  const login = (
    token: string,
    user: User
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);

    setUser(user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken(null);

    setUser(null);
  };

  // MEMOIZED VALUE
  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};