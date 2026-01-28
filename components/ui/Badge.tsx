import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type BadgeVariant = 'pilot' | 'earlyCommercial' | 'mature' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({ label, variant = 'default', style, textStyle }: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getVariantColor = (): string => {
    if (variant === 'pilot') return colors.pilot;
    if (variant === 'earlyCommercial') return colors.earlyCommercial;
    if (variant === 'mature') return colors.mature;
    return colors.tint;
  };

  const badgeColor = getVariantColor();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: `${badgeColor}15`, // 15% opacity
          borderColor: badgeColor,
        },
        style,
      ]}>
      <ThemedText
        style={[
          styles.badgeText,
          {
            color: badgeColor,
          },
          textStyle,
        ]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
