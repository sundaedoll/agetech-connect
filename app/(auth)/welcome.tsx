import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Logo/Icon area - placeholder for app logo */}
          <View style={styles.logoContainer}>
            <ThemedText type="title" style={styles.logoText}>
              Agetech Connect
            </ThemedText>
          </View>

          {/* Main heading */}
          <ThemedText type="title" style={styles.heading}>
            Welcome to Agetech Connect
          </ThemedText>

          {/* Subtitle */}
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Connect with trusted partners in aging technology. Find the right match for your care needs.
          </ThemedText>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* CTA Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              onPress={() => router.push('./signup' as any)}
              variant="primary"
              size="large"
              style={styles.button}
            />
            <Button
              title="Log In"
              onPress={() => router.push('./login' as any)}
              variant="outline"
              size="large"
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    width: '100%',
  },
});
