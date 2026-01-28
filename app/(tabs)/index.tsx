import { router } from 'expo-router';
import { useEffect } from 'react';

export default function IndexScreen() {
  useEffect(() => {
    // Redirect to matches screen
    router.replace('./matches' as any);
  }, []);

  return null;
}
