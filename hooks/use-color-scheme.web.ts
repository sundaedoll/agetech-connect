import { useThemeOptional } from '@/contexts/theme-context';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/** To support static rendering, system scheme needs to be re-calculated on the client for web */
export function useColorScheme(): 'light' | 'dark' {
  const [hasHydrated, setHasHydrated] = useState(false);
  const theme = useThemeOptional();
  const systemScheme = useRNColorScheme();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (theme?.colorScheme) {
    return theme.colorScheme;
  }
  if (hasHydrated && systemScheme === 'dark') {
    return 'dark';
  }
  return 'light';
}
