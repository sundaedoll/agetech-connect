import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { SelectableCard } from '@/components/ui/SelectableCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ExperienceLevel = 'beginner' | 'intermediate' | 'experienced' | null;

export default function Survey1Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selected, setSelected] = useState<ExperienceLevel>(null);

  const handleContinue = () => {
    if (selected) {
      router.push('./survey-2' as any);
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
            What's your experience level?
          </ThemedText>

          {/* Subtitle */}
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Help us understand your background
          </ThemedText>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <SelectableCard
              title="Beginner"
              subtitle="New to aging technology"
              selected={selected === 'beginner'}
              onPress={() => setSelected('beginner')}
            />
            <SelectableCard
              title="Intermediate"
              subtitle="Some experience with aging technology"
              selected={selected === 'intermediate'}
              onPress={() => setSelected('intermediate')}
            />
            <SelectableCard
              title="Experienced"
              subtitle="Extensive experience in the field"
              selected={selected === 'experienced'}
              onPress={() => setSelected('experienced')}
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
