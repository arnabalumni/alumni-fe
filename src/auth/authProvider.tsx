import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AuthContext } from "./authContext";
import { AuthContextType, AuthStateType } from "@/auth/authTypes";
import { parseJwt } from "@/lib/utils";
import { ChildrenProp } from "@/lib/types";

export const useAuth = () => useContext(AuthContext);

const initialState: AuthStateType = {
  token: null,
  loading: true,
};

type Action = {
  payload: Omit<AuthStateType, "loading">;
};

const reducer = (_: any, action: Action): AuthStateType => {
  return {
    loading: false,
    token: action.payload.token,
  };
};

type Claim = {
  isHod: boolean;
  departmentId: number;
};

export function AuthProvider({ children }: ChildrenProp) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [claims, setClaims] = useState<Claim | null>(null);

  useEffect(() => {
    if (!state.token) return;
    const claims = parseJwt(state.token);
    setClaims({ isHod: claims.isHod, departmentId: claims.departmentId });
  }, [state.token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    let isHod = null;
    let departmentId = null;
    if (storedToken) {
      const claims = parseJwt(storedToken);
      //   console.log(claims);
      isHod = claims.isHod;
      departmentId = claims.departmentId;
    }
    dispatch({
      payload: {
        token: storedToken ? storedToken : null, //store from local storage
      },
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({
      payload: {
        token: null,
      },
    });
  }, []);

  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    dispatch({
      payload: {
        token: token,
      },
    });
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      token: state.token,
      loading: state.loading,
      isHod: claims?.isHod ?? null,
      departmentId: claims?.departmentId ?? null,
      logout,
      login,
    }),
    [state, logout, login, claims]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
