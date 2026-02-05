import { ThemedText } from '@/components/themed-text';
import { TrustTeal } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#1a1f2e';
const CARD_BG = '#252d3a';
const BORDER = '#3d4f5f';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#9CA3AF';

const getMatchDetail = (id: string) => {
  const matches: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Sentinel Fall Sensor',
      company: 'CareTech Innovators',
      category: 'Safety & Monitoring',
      stage: 'mature' as const,
      matchReason: 'Reduces nighttime staffing costs by 15% based on your facility size and historical fall data.',
      description: 'AI-powered fall detection system with 24/7 monitoring. Designed for care facilities to improve resident safety while optimizing staff efficiency.',
      features: [
        'Real-time fall detection with AI',
        '24/7 monitoring dashboard',
        'Integration with nurse call systems',
        'Reduced false alarms',
        'Scalable for facility size',
      ],
      contact: 'contact@caretech.com',
    },
    '2': {
      id: '2',
      name: 'CareTech Solutions',
      company: 'CareTech Innovators',
      category: 'Health Monitoring',
      stage: 'earlyCommercial' as const,
      matchReason: 'Matches your focus on quality and reliability',
      description: 'Comprehensive health monitoring systems for aging adults. Real-time tracking of vital signs, medication adherence, and daily activity.',
      features: [
        'Real-time vital sign monitoring',
        'Medication reminder system',
        'Family caregiver dashboard',
        'Integration with healthcare providers',
      ],
      contact: 'contact@caretech.com',
    },
    '3': {
      id: '3',
      name: 'SeniorCare Innovations',
      company: 'SeniorCare Inc',
      category: 'Assistive Technology',
      stage: 'mature' as const,
      matchReason: 'Proven track record with care facilities',
      description: 'Trusted assistive technology partner for over 10 years. Mobility aids, communication devices, and home safety solutions.',
      features: [
        'Wide range of assistive devices',
        'Professional installation services',
        'Ongoing support and maintenance',
        'Insurance coordination',
      ],
      contact: 'info@seniorcare.com',
    },
    '4': {
      id: '4',
      name: 'WellnessTracker Pro',
      company: 'WellnessTech',
      category: 'Health Monitoring',
      stage: 'pilot' as const,
      matchReason: 'Innovative approach to caregiver support',
      description: 'AI-powered wellness tracking platform combining wearables with insights for caregivers.',
      features: [
        'AI-powered health insights',
        'Wearable device integration',
        'Predictive health analytics',
        'Caregiver mobile app',
      ],
      contact: 'hello@wellnesstracker.com',
    },
    '5': {
      id: '5',
      name: 'SmartHome Care',
      company: 'HomeTech Solutions',
      category: 'Home Automation',
      stage: 'earlyCommercial' as const,
      matchReason: 'Aligns with your interest in home-based care solutions',
      description: 'Intelligent home automation for aging in place. Seamless integration with existing home systems.',
      features: [
        'Smart home sensors',
        'Voice-controlled devices',
        'Family monitoring app',
        'Professional installation',
      ],
      contact: 'info@homecare.com',
    },
  };
  return matches[id] || matches['1'];
};

export default function MatchDetailScreen() {
  const { matchId, fromSwipe } = useLocalSearchParams<{ matchId: string; fromSwipe?: string }>();
  const match = getMatchDetail(matchId || '1');
  const isFromSwipe = fromSwipe === '1';

  const handleConfirmMatch = () => {
    router.push(`./match-success?matchId=${match.id}&matchName=${encodeURIComponent(match.company || match.name)}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} activeOpacity={0.8}>
          <MaterialCommunityIcons name="close" size={28} color={TEXT_PRIMARY} />
        </TouchableOpacity>
        {isFromSwipe && (
          <ThemedText style={styles.headerTitle}>Match Preview</ThemedText>
        )}
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <ThemedText style={styles.title}>{match.name}</ThemedText>
          <ThemedText style={styles.company}>by {match.company}</ThemedText>

          {/* GOOD FIT BECAUSE - prominent when from swipe */}
          {match.matchReason && (
            <View style={styles.matchReasonCard}>
              <View style={styles.matchReasonHeader}>
                <MaterialCommunityIcons name="lightning-bolt" size={22} color={TrustTeal} />
                <ThemedText style={styles.matchReasonLabel}>GOOD FIT BECAUSE...</ThemedText>
              </View>
              <ThemedText style={styles.matchReasonText}>{match.matchReason}</ThemedText>
            </View>
          )}

          {/* About */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
            <ThemedText style={styles.description}>{match.description}</ThemedText>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Key Features</ThemedText>
            {match.features.map((feature: string, index: number) => (
              <View key={index} style={styles.featureItem}>
                <MaterialCommunityIcons name="check-circle" size={20} color={TrustTeal} style={styles.featureIcon} />
                <ThemedText style={styles.featureText}>{feature}</ThemedText>
              </View>
            ))}
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
            <ThemedText style={styles.contact}>{match.contact}</ThemedText>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            {isFromSwipe ? (
              <>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleConfirmMatch}
                  activeOpacity={0.8}>
                  <ThemedText style={styles.confirmBtnText}>Confirm Match</ThemedText>
                  <MaterialCommunityIcons name="heart" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => router.back()}
                  activeOpacity={0.8}>
                  <ThemedText style={styles.backBtnText}>Back to Discovery</ThemedText>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => router.push(`./messages?matchId=${match.id}` as any)}
                  activeOpacity={0.8}>
                  <ThemedText style={styles.confirmBtnText}>Start Conversation</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
                  <ThemedText style={styles.backBtnText}>Back to Matches</ThemedText>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 12,
  },
  closeBtn: { padding: 8 },
  headerTitle: { fontSize: 14, fontWeight: '700', color: TEXT_SECONDARY, letterSpacing: 1 },
  headerRight: { width: 44 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 32 },
  content: { paddingTop: 8 },
  title: { fontSize: 28, fontWeight: '700', color: TEXT_PRIMARY, marginBottom: 4 },
  company: { fontSize: 16, color: TrustTeal, marginBottom: 24 },
  matchReasonCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: TrustTeal + '60',
  },
  matchReasonHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  matchReasonLabel: { fontSize: 12, fontWeight: '700', color: TrustTeal, letterSpacing: 1 },
  matchReasonText: { fontSize: 16, lineHeight: 24, color: TEXT_PRIMARY },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: TEXT_PRIMARY, marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 24, color: TEXT_SECONDARY },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureIcon: { marginRight: 12 },
  featureText: { fontSize: 16, lineHeight: 22, color: TEXT_PRIMARY, flex: 1 },
  contact: { fontSize: 16, color: TEXT_SECONDARY },
  actions: { marginTop: 16, gap: 12 },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TrustTeal,
    borderRadius: 999,
    paddingVertical: 18,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmBtnText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: BORDER,
  },
  backBtnText: { fontSize: 16, fontWeight: '600', color: TEXT_SECONDARY },
});
