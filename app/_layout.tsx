import { OnboardingSurveyProvider } from '@/contexts/onboarding-survey';
import { ThemeProvider as ThemeProviderCustom } from '@/contexts/theme-context';
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

import { useTheme } from '@/contexts/theme-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { setColorScheme } = useTheme();
  const insets = useSafeAreaInsets();

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            position: 'absolute',
            top: insets.top + 8,
            right: 16,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.7}>
          <MaterialCommunityIcons
            name={colorScheme === 'dark' ? 'white-balance-sunny' : 'weather-night'}
            size={24}
            color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
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
      <ThemeProviderCustom>
        <OnboardingSurveyProvider>
          <RootLayoutContent />
        </OnboardingSurveyProvider>
      </ThemeProviderCustom>
    </GestureHandlerRootView>
  );
}
