import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const isDisabled = disabled || loading;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    if (size === 'large') {
      baseStyle.paddingVertical = 16;
      baseStyle.paddingHorizontal = 24;
      baseStyle.minHeight = 56; // Large tap target for accessibility
    } else if (size === 'medium') {
      baseStyle.paddingVertical = 12;
      baseStyle.paddingHorizontal = 20;
      baseStyle.minHeight = 48;
    } else {
      baseStyle.paddingVertical = 8;
      baseStyle.paddingHorizontal = 16;
      baseStyle.minHeight = 40;
    }

    // Variant styles
    if (variant === 'primary') {
      baseStyle.backgroundColor = isDisabled ? colors.border : colors.tint;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = isDisabled ? colors.border : colors.backgroundSecondary;
    } else {
      // outline
      baseStyle.backgroundColor = 'transparent';
      baseStyle.borderWidth = 1.5;
      baseStyle.borderColor = isDisabled ? colors.border : colors.tint;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    if (size === 'large') {
      baseStyle.fontSize = 18;
    } else if (size === 'medium') {
      baseStyle.fontSize = 16;
    } else {
      baseStyle.fontSize = 14;
    }

    if (variant === 'primary') {
      baseStyle.color = '#FFFFFF';
    } else if (variant === 'secondary') {
      baseStyle.color = colors.text;
    } else {
      // outline
      baseStyle.color = isDisabled ? colors.textSecondary : colors.tint;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.tint}
        />
      ) : (
        <ThemedText style={[getTextStyle(), textStyle]}>{title}</ThemedText>
      )}
    </TouchableOpacity>
  );
}
