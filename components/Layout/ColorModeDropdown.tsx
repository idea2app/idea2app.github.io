import { useEffect, useState } from 'react';

import { Button } from '../ui/button';

import { SymbolIcon } from '../Icon';

export const themeSwitchIcons = {
  light: <SymbolIcon name="light_mode" />,
  dark: <SymbolIcon name="dark_mode" />,
};

export function ColorModeIconDropdown() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = document.cookie
      .split('; ')
      .find(item => item.startsWith('colorScheme='))
      ?.split('=')[1];
    const resolvedMode =
      saved === 'dark' || saved === 'light'
        ? saved
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    setMode(resolvedMode);
    document.documentElement.dataset.bsTheme = resolvedMode;
    document.documentElement.classList.toggle('dark', resolvedMode === 'dark');
  }, []);

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';

    setMode(nextMode);
    document.documentElement.dataset.bsTheme = nextMode;
    document.documentElement.classList.toggle('dark', nextMode === 'dark');
    document.cookie = `colorScheme=${nextMode};path=/;max-age=31536000`;
  };

  const icon = themeSwitchIcons[mode];

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      data-screenshot="toggle-mode"
      onClick={toggleMode}
    >
      {icon}
    </Button>
  );
}
