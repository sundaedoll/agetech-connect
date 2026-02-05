import { useThemeOptional } from '@/contexts/theme-context';
import { useColorScheme as useRNColorScheme } from 'react-native';

/** Returns the resolved color scheme: user preference if set, otherwise system */
export function useColorScheme(): 'light' | 'dark' {
  const theme = useThemeOptional();
  const systemScheme = useRNColorScheme();

  if (theme?.colorScheme) {
    return theme.colorScheme;
  }
  return systemScheme === 'dark' ? 'dark' : 'light';
}
