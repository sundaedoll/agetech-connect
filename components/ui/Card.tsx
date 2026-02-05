import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getShadowStyle } from '@/utils/shadow-styles';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevated?: boolean;
}

export function Card({ children, style, onPress, elevated = true }: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const cardStyle: ViewStyle = {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  };

  if (elevated) {
    Object.assign(cardStyle, getShadowStyle({
      color: colors.shadow,
      offset: { width: 0, height: 2 },
      opacity: 0.1,
      radius: 8,
    }));
  }

  if (onPress) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <ThemedView style={[cardStyle, style]} lightColor={colors.cardBackground} darkColor={colors.cardBackground}>
      {children}
    </ThemedView>
  );
}
