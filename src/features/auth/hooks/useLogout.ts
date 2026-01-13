import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authKeys } from "./authKeys";
import { http } from "@/api/http";
import { clearAccessToken } from "../utils/storage";

export function useLogout() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: async () => {
      return await http.post('/auth/logout');
    },
    onMutate: async () => {
      clearAccessToken();
      qc.setQueryData(authKeys.me(), null);
    },
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      navigate('/login', { replace: true });
    },
    onSettled: () => {
      qc.clear();
    }
  })
}