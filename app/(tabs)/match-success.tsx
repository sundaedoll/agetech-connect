import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LIGHT_YELLOW_BG = '#FFF8DC';
const DARK_YELLOW_HEART = '#8B6914';
const WAVE_COLOR = 'rgba(139, 105, 20, 0.25)';

const IMG_1 = require('@/assets/images/selector_page/family.jpg');
const IMG_2 = require('@/assets/images/selector_page/carefacilities.jpg');

export default function MatchSuccessScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { matchId, matchName } = useLocalSearchParams<{ matchId?: string; matchName?: string }>();
  const displayName = matchName ? decodeURIComponent(matchName) : 'CareTech Innovators';

  const primaryBlue = colors.tint;
  const heartColor = colorScheme === 'dark' ? colors.selectedOutline : DARK_YELLOW_HEART;
  const bgColor = colorScheme === 'dark' ? colors.background : LIGHT_YELLOW_BG;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]} edges={['top', 'bottom']}>
      {/* Wave lines - decorative dashed curves */}
      <View style={styles.waveLines} pointerEvents="none">
        <View style={[styles.waveArc, styles.waveTopLeft, { borderColor: WAVE_COLOR }]} />
        <View style={[styles.waveArc, styles.waveTopRight, { borderColor: WAVE_COLOR }]} />
      </View>

      <View style={styles.content}>
        {/* Small decorative hearts */}
        <View style={styles.decorHearts} pointerEvents="none">
          <MaterialCommunityIcons name="heart" size={22} color={heartColor} style={styles.heartTopRight} />
          <MaterialCommunityIcons name="heart" size={18} color={heartColor} style={styles.heartMidLeft} />
        </View>

        {/* Center: Big heart + overlapping images */}
        <View style={styles.centerSection}>
          <MaterialCommunityIcons name="heart" size={56} color={heartColor} style={styles.bigHeart} />
          <View style={styles.imageStack}>
            <View style={[styles.imageCard, styles.imageLeft]}>
              <Image source={IMG_1} style={styles.profileImage} contentFit="cover" />
            </View>
            <View style={[styles.imageCard, styles.imageRight]}>
              <Image source={IMG_2} style={styles.profileImage} contentFit="cover" />
            </View>
          </View>
        </View>

        <ThemedText style={[styles.congratsLabel, { color: heartColor }]}>CONGRATULATIONS</ThemedText>
        <ThemedText style={[styles.heading, { color: colors.text }]}>
          It's a match, {displayName.split(' ')[0] || 'there'}!!
        </ThemedText>
        <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
          Start a conversation now with each other
        </ThemedText>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: primaryBlue }]}
            onPress={() => router.replace(`./messages?matchId=${matchId || '1'}` as any)}
            activeOpacity={0.8}>
            <ThemedText style={styles.primaryBtnText}>Start conversation</ThemedText>
            <MaterialCommunityIcons name="heart" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: primaryBlue }]}
            onPress={() => router.replace('./explore' as any)}
            activeOpacity={0.8}>
            <ThemedText style={[styles.secondaryBtnText, { color: primaryBlue }]}>Keep swiping</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  waveLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  waveArc: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  waveTopLeft: {
    top: -60,
    left: -80,
  },
  waveTopRight: {
    top: -40,
    right: -70,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorHearts: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
  },
  heartTopRight: {
    position: 'absolute',
    top: 0,
    right: 32,
  },
  heartMidLeft: {
    position: 'absolute',
    top: 100,
    left: 20,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  bigHeart: {
    marginBottom: -12,
    zIndex: 3,
  },
  imageStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFF',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }),
  },
  imageLeft: {
    marginRight: -24,
    zIndex: 2,
    transform: [{ rotate: '-6deg' }],
  },
  imageRight: {
    zIndex: 1,
    transform: [{ rotate: '6deg' }],
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  congratsLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  actions: {
    width: '100%',
    gap: 14,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingVertical: 18,
    gap: 10,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }),
  },
  primaryBtnText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    paddingVertical: 18,
    borderWidth: 2,
  },
  secondaryBtnText: { fontSize: 16, fontWeight: '600' },
});
