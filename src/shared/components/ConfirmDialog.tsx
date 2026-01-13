import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import type React from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmColor?: 'error' | 'primary' | 'warning';
  confirmText?: string;
}

export default function ConfirmDialog({
  open, title, content, onClose, onConfirm,
  isLoading, confirmColor = 'error', confirmText = '삭제'
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { borderRadius: 2, width: '100%', maxWidth: 400 }
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', pb: 3 }}>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText color="text.secondary">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>취소</Button>

        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={16} color="inherit" />}
          sx={{ px: 3 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}