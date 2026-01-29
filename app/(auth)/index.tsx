import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

// Redirect to welcome screen
export default function AuthIndex() {
  const hasNavigated = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Only navigate once
    if (hasNavigated.current) return;

    const attemptNavigation = () => {
      if (hasNavigated.current) return;

      try {
        hasNavigated.current = true;
        router.replace('./welcome' as any);
      } catch (error: any) {
        // If error is about router not being ready, retry
        if (error?.message?.includes('mounting') || error?.message?.includes('Root Layout')) {
          hasNavigated.current = false;
          
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          // Retry after a longer delay
          timeoutRef.current = setTimeout(() => {
            attemptNavigation();
          }, 500);
        } else {
          console.error('Navigation error:', error);
        }
      }
    };

    // Wait for router to be ready - use a longer initial delay
    // This ensures the root layout is fully mounted
    timeoutRef.current = setTimeout(() => {
      attemptNavigation();
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <View style={{ flex: 1 }} />;
}
