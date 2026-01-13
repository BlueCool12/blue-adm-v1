import { useState } from "react";
import type { Category } from "@/features/categories/hooks/useCategories";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


interface CategoryItemProps {
  category: Category;
  depth?: number;
  selectedId: number | null;
  onSelect: (category: Category) => void;
}

export function CategoryItem({ category, depth = 0, selectedId, onSelect }: CategoryItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(category);
    if (hasChildren) {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItemButton
        selected={selectedId === category.id}
        onClick={handleClick}
        sx={{
          pl: 2 + depth * 2,
          '&.Mui-selected': {
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            '&:hover': { bgcolor: 'primary.main' },
            '& .MuiSvgIcon-root': { color: 'inherit' }
          }
        }}
      >
        <ListItemText primary={category.name} secondary={`/${category.slug}`} />
        {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.children.map((child) => (
              <CategoryItem
                key={child.id}
                category={child}
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}