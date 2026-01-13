import { http } from "@/shared/api/http";
import { useAlert } from "@/shared/hooks/useAlert";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface CreateDraftResponse {
  id: number;
}

export function useCreateDraft() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async () => {
      const { data } = await http.post<CreateDraftResponse>('/posts');
      return data;
    },
    onSuccess: (data) => {
      navigate(`/posts/${data.id}/edit`);
    },
    onError: (error) => {
      console.error("Draft creation failed:", error);
      showAlert("초안 작성에 실패했습니다.", 'error');
    }
  });
}