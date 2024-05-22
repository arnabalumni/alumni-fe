import { AuthContextType } from "@/auth/authTypes";
import { createContext } from "react";

export const AuthContext = createContext({} as AuthContextType);
