import { ThemedText } from '@/components/themed-text';
import { Colors, TEXT_SECONDARY } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
          {/* Hero icon */}
            <View style={[styles.iconWrap, { backgroundColor: colors.secondary + "20" }]}>
            <MaterialCommunityIcons
              name="hand-heart"
              size={56}
              color={colors.secondary}
            />
          </View>

          {/* Logo / brand */}
          <ThemedText style={[styles.logoText, { color: colors.tint }]}>Agetech Connect</ThemedText>

          {/* Main heading */}
          <ThemedText style={styles.heading}>
            Welcome
          </ThemedText>

          {/* Subtitle */}
          <ThemedText style={styles.subtitle}>
            Connect with trusted partners in aging technology. Find the right match for your care needs.
          </ThemedText>

          {/* Feature bullets */}
          <View style={styles.features}>
            <View style={styles.featureRow}>
              <MaterialCommunityIcons name="check-circle" size={22} color={colors.accent} style={styles.featureIcon} />
              <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>Match with caregivers & innovators</ThemedText>
            </View>
            <View style={styles.featureRow}>
              <MaterialCommunityIcons name="check-circle" size={22} color={colors.secondary} style={styles.featureIcon} />
              <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>Personalized tech recommendations</ThemedText>
            </View>
            <View style={styles.featureRow}>
              <MaterialCommunityIcons name="check-circle" size={22} color={colors.secondary} style={styles.featureIcon} />
              <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>Trusted, secure platform</ThemedText>
            </View>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* CTA Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.tint }]}
              onPress={() => router.push('./signup' as any)}
              activeOpacity={0.8}>
              <ThemedText style={styles.primaryButtonText}>Sign Up</ThemedText>
              <MaterialCommunityIcons name="arrow-right" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.outlineButton, { borderColor: colors.secondary }]}
              onPress={() => router.push('./login' as any)}
              activeOpacity={0.8}>
              <ThemedText style={[styles.outlineButtonText, { color: colors.secondary }]}>Log In</ThemedText>
            </TouchableOpacity>
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
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 48,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 128, 128, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  heading: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
  },
  features: {
    marginBottom: 32,
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    flex: 1,
  },
  spacer: {
    flex: 1,
    minHeight: 32,
  },
  buttonContainer: {
    gap: 14,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 8px rgba(0,0,0,0.25)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 6 }),
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderWidth: 2,
  },
  outlineButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
