"use client";

import { LoginFormData } from "@/app/login/Page";
import { SignupFormData } from "@/app/signup/Page";
import { Models, ID } from "appwrite";
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { account, databases, DB, USERS } from "@/Lib/appwrite";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  signup: (data: SignupFormData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  userData: Models.Document | null;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [userData, setUserData] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const res = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.username
      );
      await account.createEmailPasswordSession(data.email, data.password)
      const user = await account.get();
      setUser(user);
      await createUserData(res.name, res.email, res.$id);
      await getUserData(res.$id);
      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      const user = await account.get();
      setUser(user);
      await getUserData(user.$id);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await account.deleteSession("current");
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const createUserData = async (
    username: string,
    email: string,
    id: string
  ) => {
    try {
      await databases.createDocument(DB, USERS, id, {
        userId: id,
        username: username,
        email: email,
      });
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const getUserData = useCallback(async (id: string) => {
    try {
      const user = await databases.getDocument(DB, USERS, id);
      setUserData(user);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getUserData(user.$id);
    }
  }, [getUserData, user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    signup,
    login,
    logout,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
