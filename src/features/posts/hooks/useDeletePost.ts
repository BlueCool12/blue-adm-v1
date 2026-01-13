import { http } from "@/shared/api/http";
import { useAlert } from "@/shared/hooks/useAlert";
import type { NestErrorResponse } from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async (id: string) => {
      await http.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      showAlert('글이 정상적으로 삭제되었습니다.', 'success');
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = typeof serverMessage === 'string'
        ? serverMessage
        : '글 삭제 중 오류가 발생했습니다.';

      console.error("Post deletion failed:", error);
      showAlert(displayMessage, 'error');
    }
  })
}