
export type PostListItem = {
    id: string;
    title: string;
    categoryName: string;
    slug: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type PostListQuery = {
    page?: number;
    pageSize?: number;
    q?: string;
    sort?: 'title' | 'slug' | 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
};

export type PostListResponse = {
    items: PostListItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
};

export type PostCreateDto = {
    title: string;
    categoryId: number;
    slug?: string;
    isPublic: boolean;
    content: string;
    description?: string;
}