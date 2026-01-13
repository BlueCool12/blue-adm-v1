import { createContext, useContext } from "react";
import type { AlertColor } from "@mui/material";

interface AlertContextType {
  showAlert: (message: string, severity?: AlertColor) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};