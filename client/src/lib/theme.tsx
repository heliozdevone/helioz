import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'crt' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={{ theme: 'crt' }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
