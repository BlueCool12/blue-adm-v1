import { http } from "@/shared/api/http";
import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  children: Category[];
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await http.get('/categories');
      return data;
    },
    staleTime: 1000 * 60 * 5,
  })
}