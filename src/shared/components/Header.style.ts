import { IconButton, styled } from "@mui/material";

export const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.vars?.palette.text.secondary,
  padding: 8,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));