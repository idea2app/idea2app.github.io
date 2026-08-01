import { useEffect, useState } from 'react';

export const useColorScheme = () => {
  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';

    const saved = window.localStorage.getItem('color-mode');

    if (saved === 'light' || saved === 'dark') return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    window.localStorage.setItem('color-mode', mode);
  }, [mode]);

  return {
    mode,
    systemMode: undefined,
    setMode: (value: 'light' | 'dark') => setModeState(value),
  };
};
