export type AuthContextType = {
  token: string | null;
  isHod: boolean | null;
  departmentId: number | null;
  loading: boolean;
  logout?: () => void;
  login: (token: string) => void;
};
