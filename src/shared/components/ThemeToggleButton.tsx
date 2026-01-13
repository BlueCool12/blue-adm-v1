import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { useColorScheme } from "@mui/material";
import { HeaderIconButton } from "@/shared/components/Header.style";

export function ThemeToggleButton() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <HeaderIconButton size="small" onClick={handleToggle}>
      {mode === 'light' ? (
        <DarkModeRounded fontSize="small" />
      ) : (
        <LightModeRounded fontSize="small" />
      )}
    </HeaderIconButton>
  )
}