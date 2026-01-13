import type { Category } from "@/features/categories/hooks/useCategories";

interface FlatCategory extends Omit<Category, 'children'> {
  depth: number;
}

export const flattenCategories = (nodes: Category[], depth = 0): FlatCategory[] => {
  return nodes.reduce((acc: FlatCategory[], node) => {
    const { children, ...rest } = node;
    acc.push({ ...rest, depth });

    if (children && children.length > 0) {
      acc.push(...flattenCategories(children, depth + 1));
    }

    return acc;
  }, []);
};