import { Platform, ViewStyle } from 'react-native';

/**
 * Returns shadow styles that work on both native (iOS/Android) and web.
 * On web, uses boxShadow to avoid "shadow* props are deprecated" warning.
 */
export function getShadowStyle(options: {
  color?: string;
  offset?: { width: number; height: number };
  opacity?: number;
  radius?: number;
}): ViewStyle {
  const {
    color = 'rgba(0,0,0,0.1)',
    offset = { width: 0, height: 2 },
    opacity = 0.1,
    radius = 8,
  } = options;

  if (Platform.OS === 'web') {
    let boxColor = color;
    if (color.startsWith('rgba(')) {
      const match = color.replace(/\s/g, '').match(/rgba?\((\d+),(\d+),(\d+),([\d.]+)\)/);
      if (match) boxColor = `rgba(${match[1]},${match[2]},${match[3]},${opacity})`;
    } else if (color.startsWith('#')) {
      const [r, g, b] = parseRgba(color);
      boxColor = `rgba(${r},${g},${b},${opacity})`;
    }
    return {
      boxShadow: `${offset.width}px ${offset.height}px ${radius}px ${boxColor}`,
    };
  }

  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

function parseRgba(color: string): [number, number, number] {
  if (color.startsWith('rgba(')) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) return [Number(match[1]), Number(match[2]), Number(match[3])];
  }
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }
  return [0, 0, 0];
}
