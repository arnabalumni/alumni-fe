import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AuthContext } from "./authContext";
import { AuthContextType, AuthStateType } from "@/types";
import { parseJwt } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export const useAuth = () => useContext(AuthContext);

const initialState: AuthStateType = {
  token: null,
  loading: true,
};

type Action = {
  payload: Omit<AuthStateType, "loading">;
};

const reducer = (state: AuthStateType, action: Action): AuthStateType => {
  return {
    loading: false,
    token: action.payload.token,
  };
};

type Claim = {
  isHod: boolean;
  departmentId: number;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [claims, setClaims] = useState<Claim | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    let isHod = null;
    let departmentId = null;
    if (storedToken) {
      const claims = parseJwt(storedToken);
      console.log(claims);
      isHod = claims.isHod;
      departmentId = claims.departmentId;
    }
    dispatch({
      payload: {
        token: storedToken ? storedToken : null, //store from local storage
      },
    });
    setClaims({ isHod: isHod, departmentId: departmentId });
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
    const claims = parseJwt(token);
    dispatch({
      payload: {
        token: token,
      },
    });
    setClaims({ isHod: claims.isHod, departmentId: claims.departmentId });
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
    [state, logout, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
