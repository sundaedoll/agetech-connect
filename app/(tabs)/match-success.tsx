import { ThemedText } from '@/components/themed-text';
import { TrustTeal } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#1a1f2e';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#9CA3AF';

export default function MatchSuccessScreen() {
  const { matchId, matchName } = useLocalSearchParams<{ matchId?: string; matchName?: string }>();
  const displayName = matchName ? decodeURIComponent(matchName) : 'SmartCare Innovators';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('./explore' as any)} style={styles.closeBtn} activeOpacity={0.8}>
          <MaterialCommunityIcons name="close" size={28} color={TEXT_PRIMARY} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>MATCH SUCCESS</ThemedText>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.heading}>It's a Match!</ThemedText>

        {/* Overlapping profile circles */}
        <View style={styles.profilesWrap}>
          <View style={[styles.profileCircle, styles.profileLeft]}>
            <MaterialCommunityIcons name="account" size={48} color={TrustTeal} />
          </View>
          <View style={[styles.profileCircle, styles.profileRight]}>
            <MaterialCommunityIcons name="domain" size={40} color={TrustTeal} />
          </View>
          <View style={styles.connectionBadge}>
            <MaterialCommunityIcons name="handshake-outline" size={24} color="#FFFFFF" />
          </View>
        </View>

        <ThemedText style={styles.matchNames}>You & {displayName}</ThemedText>
        <ThemedText style={styles.description}>
          You and {displayName} have expressed mutual interest. Start a conversation about their solutions.
        </ThemedText>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.replace(`./messages?matchId=${matchId || '1'}` as any)}
            activeOpacity={0.8}>
            <MaterialCommunityIcons name="send" size={22} color="#FFFFFF" />
            <ThemedText style={styles.primaryBtnText}>Start Conversation</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.replace('./explore' as any)}
            activeOpacity={0.8}>
            <ThemedText style={styles.secondaryBtnText}>Keep Swiping</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  closeBtn: { padding: 8 },
  headerTitle: { fontSize: 12, fontWeight: '700', color: TEXT_SECONDARY, letterSpacing: 1.5 },
  headerRight: { width: 44 },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 32,
    textAlign: 'center',
  },
  profilesWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  profileCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#252d3a',
    borderWidth: 3,
    borderColor: TrustTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileLeft: { marginRight: -16, zIndex: 2 },
  profileRight: { zIndex: 1 },
  connectionBadge: {
    position: 'absolute',
    bottom: -8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TrustTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchNames: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 40,
  },
  actions: { width: '100%', gap: 14 },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E8',
    borderRadius: 14,
    paddingVertical: 18,
    gap: 10,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 8px rgba(0,0,0,0.25)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 6 }),
  },
  primaryBtnText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252d3a',
    borderRadius: 14,
    paddingVertical: 18,
  },
  secondaryBtnText: { fontSize: 16, fontWeight: '600', color: TEXT_PRIMARY },
});
