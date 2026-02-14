import { SwipeCards, type SwipeCardData } from '@/components/swipe-cards';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockCards: SwipeCardData[] = [
  {
    id: '1',
    name: 'Sentinel Fall Sensor',
    company: 'CareTech Innovators',
    category: 'Safety & Monitoring',
    stage: 'mature',
    description: 'AI-powered fall detection with 24/7 monitoring.',
    matchReason: 'Reduces nighttime staffing costs by 15% based on your facility size.',
    tags: ['Mature Tech', 'Safety & Monitoring', 'Looking for Pilots'],
  },
  {
    id: '2',
    name: 'CareTech Solutions',
    company: 'CareTech Innovators',
    category: 'Health Monitoring',
    stage: 'earlyCommercial',
    description: 'Advanced health monitoring with real-time alerts.',
    matchReason: 'Matches your focus on quality and reliability',
    tags: ['Early Commercial', 'Health Monitoring', 'Pilot Sites'],
  },
  {
    id: '3',
    name: 'SeniorCare Innovations',
    company: 'SeniorCare Inc',
    category: 'Assistive Technology',
    stage: 'mature',
    description: 'Proven assistive technology with 10+ years experience.',
    matchReason: 'Proven track record with care facilities',
    tags: ['Mature Tech', 'Assistive Tech', 'Sales Opportunities'],
  },
  {
    id: '4',
    name: 'WellnessTracker Pro',
    company: 'WellnessTech',
    category: 'Health Monitoring',
    stage: 'pilot',
    description: 'AI-powered wellness tracking platform.',
    matchReason: 'Innovative approach to caregiver support',
    tags: ['Pilot Tech', 'Health Monitoring', 'User Feedback'],
  },
  {
    id: '5',
    name: 'SmartHome Care',
    company: 'HomeTech Solutions',
    category: 'Home Automation',
    stage: 'earlyCommercial',
    description: 'Intelligent home automation for aging in place.',
    matchReason: 'Aligns with your interest in home-based care solutions',
    tags: ['Early Commercial', 'Home Automation', 'Pilot Sites'],
  },
];

const FILTER_CATEGORIES = ['All', 'Safety & Monitoring', 'Health Monitoring', 'Assistive Technology', 'Home Automation'];
const FILTER_STAGES = ['All', 'Pilot Tech', 'Early Commercial', 'Mature Tech'];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [cards] = useState(mockCards);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');

  const handleSwipeLeft = (card: SwipeCardData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSwipeRight = (card: SwipeCardData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`./match-detail?matchId=${card.id}&fromSwipe=1` as any);
  };

  const openFilter = () => {
    setFilterVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const closeFilter = () => setFilterVisible(false);

  const applyFilter = () => {
    setFilterVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Header - centered title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.8}>
          <MaterialCommunityIcons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={[styles.headerCenter, { backgroundColor: colors.background }]}>
          <ThemedText style={[styles.headerTitle, { color: colors.tint }]}>Agetech Connect</ThemedText>
          <ThemedText style={[styles.headerSub, { color: colors.textSecondary }]}>Discovery</ThemedText>
        </View>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.8}>
          <MaterialCommunityIcons name="theme-light-dark" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Filter Bar - no blue lines */}
      <View style={[styles.filterBar, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.cardBackground }]}
          onPress={openFilter}
          activeOpacity={0.8}>
          <MaterialCommunityIcons name="filter-variant" size={20} color={colors.text} />
          <ThemedText style={[styles.filterLabel, { color: colors.text }]}>Filters</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Swipe Card Area */}
      <View style={styles.cardsContainer}>
        <SwipeCards
          cards={cards}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </View>

      {/* Filter Modal */}
      <Modal visible={filterVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeFilter}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={[styles.filterModal, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHandle, { backgroundColor: colors.border }]} />
            <ThemedText style={[styles.modalTitle, { color: colors.text }]}>Filter by</ThemedText>

            <ThemedText style={[styles.filterSectionLabel, { color: colors.textSecondary }]}>Category</ThemedText>
            <View style={styles.filterChips}>
              {FILTER_CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.filterChip,
                    { borderColor: colors.border, backgroundColor: colors.cardBackground },
                    selectedCategory === c && { backgroundColor: colors.tint, borderColor: colors.tint },
                  ]}
                  onPress={() => setSelectedCategory(c)}
                  activeOpacity={0.8}>
                  <ThemedText style={[styles.filterChipText, { color: colors.text }, selectedCategory === c && { color: '#FFF' }]}>{c}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <ThemedText style={[styles.filterSectionLabel, { color: colors.textSecondary }]}>Stage</ThemedText>
            <View style={styles.filterChips}>
              {FILTER_STAGES.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.filterChip,
                    { borderColor: colors.border, backgroundColor: colors.cardBackground },
                    selectedStage === s && { backgroundColor: colors.tint, borderColor: colors.tint },
                  ]}
                  onPress={() => setSelectedStage(s)}
                  activeOpacity={0.8}>
                  <ThemedText style={[styles.filterChipText, { color: colors.text }, selectedStage === s && { color: '#FFF' }]}>{s}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.applyBtn, { backgroundColor: colors.tint }]}
              onPress={applyFilter}
              activeOpacity={0.8}>
              <ThemedText style={styles.applyBtnText}>Apply Filters</ThemedText>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    paddingBottom: 12,
  },
  headerIcon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  headerSub: { fontSize: 12, fontWeight: '600', marginTop: 2, textAlign: 'center' },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  filterLabel: { fontSize: 14, fontWeight: '600' },
  cardsContainer: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 24 },
  filterSectionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  filterChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterChipText: { fontSize: 14, fontWeight: '600' },
  applyBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  applyBtnText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
});
