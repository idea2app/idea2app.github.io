import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

import { Icon } from '../Icon';

export const themeSwitchIcons = {
  light: <Icon name="light_mode" />,
  dark: <Icon name="dark_mode" />
};

export default function ColorModeIconDropdown() {
  const { mode, systemMode, setMode } = useColorScheme();

  const resolvedMode = (systemMode ?? mode) as 'light' | 'dark';
  const icon = themeSwitchIcons[resolvedMode];

  const toggleMode = () => {
    setMode(resolvedMode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton data-screenshot="toggle-mode" size="small" disableRipple onClick={toggleMode}>
      {icon}
    </IconButton>
  );
}
