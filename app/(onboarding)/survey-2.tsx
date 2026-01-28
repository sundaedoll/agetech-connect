import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { SelectableCard } from '@/components/ui/SelectableCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Priority = 'cost' | 'quality' | 'innovation' | 'support' | null;

export default function Survey2Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selected, setSelected] = useState<Priority>(null);

  const handleContinue = () => {
    if (selected) {
      // Navigate to main app after onboarding
      router.replace('../(tabs)' as any);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <ThemedText type="title" style={styles.title}>
            What's most important to you?
          </ThemedText>

          {/* Subtitle */}
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select your top priority when choosing solutions
          </ThemedText>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <SelectableCard
              title="Cost Effectiveness"
              subtitle="Affordable solutions that provide value"
              selected={selected === 'cost'}
              onPress={() => setSelected('cost')}
            />
            <SelectableCard
              title="Quality & Reliability"
              subtitle="Proven, trustworthy solutions"
              selected={selected === 'quality'}
              onPress={() => setSelected('quality')}
            />
            <SelectableCard
              title="Innovation"
              subtitle="Cutting-edge technology and features"
              selected={selected === 'innovation'}
              onPress={() => setSelected('innovation')}
            />
            <SelectableCard
              title="Support & Training"
              subtitle="Comprehensive support and guidance"
              selected={selected === 'support'}
              onPress={() => setSelected('support')}
            />
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={handleContinue}
              variant="primary"
              size="large"
              disabled={!selected}
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 32,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
