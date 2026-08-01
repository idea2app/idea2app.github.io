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
    const saved = window.localStorage.getItem('color-mode');
    const resolvedMode =
      saved === 'light' || saved === 'dark'
        ? saved
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    setMode(resolvedMode);
    document.documentElement.classList.toggle('dark', resolvedMode === 'dark');
  }, []);

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';

    setMode(nextMode);
    document.documentElement.classList.toggle('dark', nextMode === 'dark');
    window.localStorage.setItem('color-mode', nextMode);
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
