import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

// Import font polyfill for web to fix FontFaceObserver timeout issues
if (Platform.OS === 'web') {
  try {
    require('../web/fontfaceobserver-polyfill');
  } catch (e) {
    // Polyfill file might not exist, that's okay
  }
}

import { useColorScheme } from '@/hooks/use-color-scheme';

// Prevent the splash screen from auto-hiding before fonts are loaded
// But we'll hide it manually after a timeout to prevent blocking
SplashScreen.preventAutoHideAsync();

// Fix FontFaceObserver timeout issue on web
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  // Handle unhandled promise rejections from FontFaceObserver
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && typeof event.reason === 'object') {
      const errorMessage = event.reason.message || String(event.reason);
      if (errorMessage.includes('timeout exceeded') && 
          (errorMessage.includes('fontfaceobserver') || 
           event.reason.stack?.includes('fontfaceobserver'))) {
        event.preventDefault();
        console.warn('Font loading timeout handled gracefully - fonts will load asynchronously');
      }
    }
  });

  // Handle errors from FontFaceObserver
  window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('timeout exceeded') && 
        event.message.includes('fontfaceobserver')) {
      event.preventDefault();
      console.warn('Font loading timeout handled gracefully - fonts will load asynchronously');
    }
  });
}

export const unstable_settings = {
  // Start with auth flow - change to '(tabs)' after authentication
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Handle splash screen and font loading with timeout protection
  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        // Wait a short time for any font loading, but don't block forever
        await Promise.race([
          new Promise(resolve => setTimeout(resolve, 1000)), // Max 1 second wait
          // If there are fonts loading, they should complete quickly
        ]);
      } catch (error) {
        // Ignore font loading errors
        console.warn('Font loading issue, continuing anyway:', error);
      } finally {
        // Always hide splash screen, even if fonts didn't load
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, []);

  // Additional error handling for web and iOS
  useEffect(() => {
    // Catch any remaining font loading errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if ((message.includes('timeout exceeded') && message.includes('fontfaceobserver')) ||
          (message.includes('timeout') && message.includes('font'))) {
        // Suppress font timeout errors
        console.warn('Font loading timeout - continuing without blocking');
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Handle unhandled promise rejections (only for web)
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleUnhandledRejection = (event: any) => {
        const error = event.reason;
        if (error && typeof error === 'object') {
          const errorMessage = error.message || String(error);
          if ((errorMessage.includes('timeout exceeded') && 
               (errorMessage.includes('fontfaceobserver') || errorMessage.includes('font'))) ||
              (error.stack && error.stack.includes('fontfaceobserver'))) {
            if (event.preventDefault) {
              event.preventDefault();
            }
            console.warn('Font loading timeout handled gracefully');
          }
        }
      };

      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      return () => {
        console.error = originalConsoleError;
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
