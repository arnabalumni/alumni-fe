import axios from "axios";
import { useCallback } from "react";

export function useApi() {
  const loginWithUsernamePassword = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/login`,
        {
          username,
          password,
        }
      );
      if (!response.data.token) {
        throw new Error("Invalid Username or Password");
      }
      return response.data.token;
    },
    []
  );
  return { loginWithUsernamePassword };
}
