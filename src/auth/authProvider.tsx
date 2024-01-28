import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AuthContext } from "./authContext";
import { ActionMapType, AuthContextType, AuthStateType } from "@/types";
import { parseJwt } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

enum Types {
  INITIAL = "INITIAL",
}

export const useAuth = () => useContext(AuthContext);

type Payload = {
  [Types.INITIAL]: {
    token: string | null;
    loading?: boolean;
  };
};

type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  token: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action): AuthStateType => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      token: action.payload.token,
    };
  }
  return state;
};

type Claim = {
  isHod: boolean;
  departmentId: number;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [claims, setClaims] = useState<Claim | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const storedToken = localStorage.getItem("token");
      let isHod = null;
      let departmentId = null;
      if (storedToken) {
        const claims = parseJwt(storedToken);
        isHod = claims.isHod;
        departmentId = claims.departmentId;
      }
      dispatch({
        type: Types.INITIAL,
        payload: {
          token: storedToken ? storedToken : null, //store from local storage
        },
      });
      setClaims({ isHod: isHod, departmentId: departmentId });
      return () => clearTimeout(timeout);
    }, 5000);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({
      type: Types.INITIAL,
      payload: {
        token: null,
      },
    });
  }, []);

  const login = useCallback((token: string) => {
    const claims = parseJwt(token);
    dispatch({
      type: Types.INITIAL,
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
