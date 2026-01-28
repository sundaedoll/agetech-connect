import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function SelectableCard({
  title,
  subtitle,
  selected = false,
  onPress,
  style,
}: SelectableCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: selected ? `${colors.tint}10` : colors.cardBackground,
          borderColor: selected ? colors.tint : colors.border,
          borderWidth: selected ? 2 : 1,
        },
        style,
      ]}>
      <ThemedText
        style={[
          styles.title,
          {
            color: colors.text,
            fontWeight: selected ? '600' : '500',
          },
        ]}>
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
            },
          ]}>
          {subtitle}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    minHeight: 64, // Large tap target
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
});
