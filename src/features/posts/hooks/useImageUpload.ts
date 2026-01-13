import { http } from "@/shared/api/http";
import { useMutation } from "@tanstack/react-query";

interface UploadResponse {
  url: string;
}

export const useImageUpload = (postId: string | number) => {
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      if (!postId) throw new Error('postId가 없습니다.');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('postId', String(postId));

      const { data } = await http.post<UploadResponse>(
        '/media/images',
        formData
      );

      return data.url;
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  return {
    uploadImage: mutation.mutateAsync,
    isUploading: mutation.isPending,
    error: mutation.error,
  };
};