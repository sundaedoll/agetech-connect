import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const IMAGES: Record<string, number> = {
  '1': require('@/assets/images/selector_page/family.jpg'),
  '2': require('@/assets/images/selector_page/carefacilities.jpg'),
  '3': require('@/assets/images/selector_page/companies.jpg'),
  '4': require('@/assets/images/selector_page/family.jpg'),
  '5': require('@/assets/images/selector_page/carefacilities.jpg'),
};
const DEFAULT_IMAGE = require('@/assets/images/selector_page/family.jpg');

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
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { matchId, fromSwipe } = useLocalSearchParams<{ matchId: string; fromSwipe?: string }>();
  const match = getMatchDetail(matchId || '1');
  const isFromSwipe = fromSwipe === '1';

  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [featuresExpanded, setFeaturesExpanded] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleConfirmMatch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`./match-success?matchId=${match.id}&matchName=${encodeURIComponent(match.company || match.name)}` as any);
  };

  const toggleAbout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAboutExpanded((v) => !v);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleFeatures = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFeaturesExpanded((v) => !v);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleContactPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(`mailto:${match.contact}`).catch(() => {
      Share.share({ message: match.contact, title: 'Contact' });
    });
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Share.share({
      title: match.name,
      message: `${match.name} by ${match.company}\n${match.description}\nContact: ${match.contact}`,
      url: undefined,
    });
  };

  const toggleSave = () => {
    setSaved((v) => !v);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} activeOpacity={0.8}>
          <MaterialCommunityIcons name="close" size={26} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {isFromSwipe && (
            <ThemedText style={[styles.headerTitle, { color: colors.textSecondary }]}>Match Preview</ThemedText>
          )}
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleShare} style={styles.headerIconBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="share-variant" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSave} style={styles.headerIconBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={saved ? colors.selectedFill : colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Hero card with image */}
          <View style={[styles.heroCard]}>
            <View style={styles.heroImageWrap}>
              <Image
                source={IMAGES[match.id] ?? DEFAULT_IMAGE}
                style={styles.heroImage}
                contentFit="cover"
              />
            </View>
            <View style={[styles.heroOverlay]} />
            <View style={styles.heroTextWrap}>
              <ThemedText style={styles.heroTitle}>{match.name}</ThemedText>
              <ThemedText style={styles.heroCompany}>by {match.company}</ThemedText>
              <View style={[styles.categoryTag, { backgroundColor: colors.tint + 'CC' }]}>
                <ThemedText style={styles.categoryTagText}>{match.category}</ThemedText>
              </View>
            </View>
          </View>

          {/* Good fit - icon container */}
          {match.matchReason && (
            <View style={[styles.iconCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <View style={[styles.iconCardIconWrap, { backgroundColor: colors.tint + '20' }]}>
                <MaterialCommunityIcons name="lightning-bolt" size={28} color={colors.tint} />
              </View>
              <View style={styles.iconCardContent}>
                <ThemedText style={[styles.iconCardTitle, { color: colors.text }]}>Good fit because</ThemedText>
                <ThemedText style={[styles.iconCardText, { color: colors.textSecondary }]}>{match.matchReason}</ThemedText>
              </View>
            </View>
          )}

          {/* About - expandable with info icon */}
          <View style={[styles.iconCard, styles.iconCardColumn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.iconCardRow} onPress={toggleAbout} activeOpacity={0.7}>
              <View style={[styles.iconCardIconWrap, { backgroundColor: colors.secondary + '20' }]}>
                <MaterialCommunityIcons name="information-outline" size={28} color={colors.tint} />
              </View>
              <View style={[styles.iconCardContent, styles.iconCardHeaderRow]}>
                <ThemedText style={[styles.iconCardTitle, { color: colors.text }]}>About</ThemedText>
                <MaterialCommunityIcons
                  name={aboutExpanded ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
            {aboutExpanded && (
              <View style={[styles.textContainer, { backgroundColor: colors.background }]}>
                <ThemedText style={[styles.description, { color: colors.textSecondary }]}>{match.description}</ThemedText>
              </View>
            )}
          </View>

          {/* Key Features */}
          <View style={[styles.featuresCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.featuresHeader} onPress={toggleFeatures} activeOpacity={0.7}>
              <MaterialCommunityIcons name="format-list-checks" size={24} color={colors.tint} />
              <ThemedText style={[styles.featuresTitle, { color: colors.text }]}>Key Features</ThemedText>
              <MaterialCommunityIcons
                name={featuresExpanded ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {featuresExpanded && (
              <View style={styles.featureList}>
                {match.features.map((feature: string, index: number) => (
                  <View key={index} style={[styles.featureRow, index > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
                    <MaterialCommunityIcons name="check-circle" size={20} color={colors.tint} style={styles.featureIcon} />
                    <ThemedText style={[styles.featureText, { color: colors.text }]}>{feature}</ThemedText>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Contact - icon container */}
          <View style={[styles.iconCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={[styles.iconCardIconWrap, { backgroundColor: colors.secondary + '20' }]}>
              <MaterialCommunityIcons name="email-outline" size={28} color={colors.tint} />
            </View>
            <View style={styles.iconCardContent}>
              <ThemedText style={[styles.iconCardTitle, { color: colors.text }]}>Contact</ThemedText>
              <TouchableOpacity style={[styles.contactChip, { backgroundColor: colors.background }]} onPress={handleContactPress} activeOpacity={0.7}>
                <ThemedText style={[styles.contactText, { color: colors.tint }]}>{match.contact}</ThemedText>
                <MaterialCommunityIcons name="open-in-new" size={18} color={colors.tint} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            {isFromSwipe ? (
              <>
                <TouchableOpacity
                  style={[styles.confirmBtn, { backgroundColor: colors.selectedFill, borderColor: colors.selectedOutline }]}
                  onPress={handleConfirmMatch}
                  activeOpacity={0.8}>
                  <ThemedText style={[styles.confirmBtnText, { color: '#000' }]}>Confirm Match</ThemedText>
                  <MaterialCommunityIcons name="heart" size={22} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.backBtn, { borderColor: colors.border }]}
                  onPress={() => router.back()}
                  activeOpacity={0.8}>
                  <ThemedText style={[styles.backBtnText, { color: colors.textSecondary }]}>Back to Discovery</ThemedText>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.confirmBtn, { backgroundColor: colors.tint }]}
                  onPress={() => router.push(`./messages?matchId=${match.id}` as any)}
                  activeOpacity={0.8}>
                  <ThemedText style={styles.confirmBtnText}>Start Conversation</ThemedText>
                  <MaterialCommunityIcons name="arrow-right" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()} activeOpacity={0.8}>
                  <ThemedText style={[styles.backBtnText, { color: colors.textSecondary }]}>Back to Matches</ThemedText>
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
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  closeBtn: { padding: 8 },
  headerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 13, fontWeight: '700', letterSpacing: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIconBtn: { padding: 8 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 36 },
  content: { paddingTop: 20 },
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: '#E8E8E8',
  },
  heroImageWrap: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTextWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
  },
  heroTitle: { fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 4 },
  heroCompany: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginBottom: 10 },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  categoryTagText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  iconCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  iconCardColumn: { flexDirection: 'column' },
  iconCardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconCardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconCardContent: { flex: 1 },
  iconCardTitle: { fontSize: 17, fontWeight: '700', marginBottom: 6 },
  iconCardText: { fontSize: 15, lineHeight: 22 },
  iconCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
  },
  description: { fontSize: 16, lineHeight: 24 },
  featuresCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  featuresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featuresTitle: { fontSize: 17, fontWeight: '700', flex: 1 },
  featureList: { marginTop: 12 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureIcon: { marginRight: 12 },
  featureText: { fontSize: 15, flex: 1 },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  contactText: { fontSize: 16, fontWeight: '600', flex: 1 },
  actions: { gap: 12 },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingVertical: 18,
    gap: 10,
    borderWidth: 2,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }),
  },
  confirmBtnText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    paddingVertical: 18,
    borderWidth: 2,
  },
  backBtnText: { fontSize: 16, fontWeight: '600' },
});
