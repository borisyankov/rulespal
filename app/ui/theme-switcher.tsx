'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import RoundButton from './round-button';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <RoundButton>
      <SunIcon
        className="hidden size-5 text-primary dark:block"
        onClick={toggleTheme}
      />
      <MoonIcon
        className="is-light size-5 text-primary dark:hidden"
        onClick={toggleTheme}
      />
    </RoundButton>
  );
}
