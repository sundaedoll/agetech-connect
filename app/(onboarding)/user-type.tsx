import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { SelectableCard } from '@/components/ui/SelectableCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type UserType = 'caregiver' | 'facility' | 'innovator' | null;

export default function UserTypeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to first survey question
      router.push('./survey-1' as any);
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
            What describes you best?
          </ThemedText>

          {/* Subtitle */}
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select the option that best matches your role
          </ThemedText>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <SelectableCard
              title="Caregiver"
              subtitle="Individual providing care to aging adults"
              selected={selectedType === 'caregiver'}
              onPress={() => setSelectedType('caregiver')}
            />
            <SelectableCard
              title="Care Facility"
              subtitle="Organization providing care services"
              selected={selectedType === 'facility'}
              onPress={() => setSelectedType('facility')}
            />
            <SelectableCard
              title="Health Innovator"
              subtitle="Company or individual developing aging technology"
              selected={selectedType === 'innovator'}
              onPress={() => setSelectedType('innovator')}
            />
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={handleContinue}
              variant="primary"
              size="large"
              disabled={!selectedType}
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
