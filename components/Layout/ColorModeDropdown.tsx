import IconButton from '@/components/shadcn/material/IconButton';
import { useColorScheme } from '@/components/shadcn/material/styles';

import { SymbolIcon } from '../Icon';

export const themeSwitchIcons = {
  light: <SymbolIcon name="light_mode" />,
  dark: <SymbolIcon name="dark_mode" />,
};

export function ColorModeIconDropdown() {
  const { mode, systemMode, setMode } = useColorScheme();

  const resolvedMode = (systemMode ?? mode) as 'light' | 'dark';
  const icon = themeSwitchIcons[resolvedMode];

  const toggleMode = () => setMode(resolvedMode === 'light' ? 'dark' : 'light');

  return (
    <IconButton
      color="inherit"
      data-screenshot="toggle-mode"
      size="small"
      disableRipple
      onClick={toggleMode}
    >
      {icon}
    </IconButton>
  );
}
