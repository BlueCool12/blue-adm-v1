import { http } from "@/shared/api/http";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { PostResponse } from "@/features/posts/hooks/usePost";

interface PostListResponse {
  items: PostResponse[];
  total: number;
  page: number;
  lastPage: number;
}

export function usePosts(search: string, page: number) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  return useQuery({
    queryKey: ['posts', { search: debouncedSearch, page }],
    queryFn: async () => {
      const { data } = await http.get<PostListResponse>('/posts', {
        params: {
          search: debouncedSearch || undefined,
          page,
          limit: 10,
        },
      });

      return data;
    },
    placeholderData: (previousData) => previousData,
  })
}