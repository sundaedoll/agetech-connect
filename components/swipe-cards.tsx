import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;
const IMAGE_HEIGHT = 200;
const CARD_CONTENT_HEIGHT = 130;
const CARD_HEIGHT = IMAGE_HEIGHT + CARD_CONTENT_HEIGHT;
const SWIPE_THRESHOLD = 70;
const VELOCITY_THRESHOLD = 350;

const springConfig = { damping: 22, stiffness: 150 };
const swipeOutConfig = { damping: 20, stiffness: 120 };

const CARD_BG = '#FFF8DC';
const CARD_BG_ALT = '#FFF4C2';

// Use family.jpg as default - swap for download.jpg when available
const DEFAULT_CARD_IMAGE = require('@/assets/images/selector_page/family.jpg');

export type SwipeCardData = {
  id: string;
  name: string;
  company?: string;
  category: string;
  stage: 'pilot' | 'earlyCommercial' | 'mature';
  description: string;
  matchReason: string;
  tags?: string[];
  imageUri?: number;
};

interface SwipeCardsProps {
  cards: SwipeCardData[];
  onSwipeLeft?: (card: SwipeCardData) => void;
  onSwipeRight?: (card: SwipeCardData) => void;
  topMatch?: boolean;
  bottomPadding?: number;
}

export function SwipeCards({ cards, onSwipeLeft, onSwipeRight, topMatch = true, bottomPadding: propBottomPadding }: SwipeCardsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const currentIndexRef = useRef(0);
  const [renderIndex, setRenderIndex] = useState(0);
  const [lastSwiped, setLastSwiped] = useState<{ card: SwipeCardData; direction: 'left' | 'right'; index: number } | null>(null);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const bottomPadding = propBottomPadding ?? Math.max(insets.bottom, 16);

  const getStageLabel = (stage: 'pilot' | 'earlyCommercial' | 'mature') => {
    switch (stage) {
      case 'pilot': return 'Pilot Tech';
      case 'earlyCommercial': return 'Early Commercial';
      case 'mature': return 'Mature Tech';
    }
  };

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      const idx = currentIndexRef.current;
      const currentCard = cards[idx];
      setLastSwiped({ card: currentCard, direction, index: idx });

      if (direction === 'left' && onSwipeLeft) onSwipeLeft(currentCard);
      else if (direction === 'right' && onSwipeRight) onSwipeRight(currentCard);

      if (idx < cards.length - 1) {
        currentIndexRef.current = idx + 1;
        setRenderIndex(idx + 1);
      }

      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      opacity.value = 1;
    },
    [cards, onSwipeLeft, onSwipeRight, translateX, translateY, rotate, opacity]
  );

  const handleUndo = useCallback(() => {
    if (!lastSwiped || currentIndexRef.current === 0) return;
    currentIndexRef.current = lastSwiped.index;
    setRenderIndex(lastSwiped.index);
    setLastSwiped(null);
  }, [lastSwiped]);

  const panGesture = Gesture.Pan()
    .minDistance(6)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.4;
      rotate.value = (event.translationX / CARD_WIDTH) * 10;
    })
    .onEnd((event) => {
      const absX = Math.abs(event.translationX);
      const velocityX = event.velocityX;
      const shouldSwipe = absX > SWIPE_THRESHOLD || Math.abs(velocityX) > VELOCITY_THRESHOLD;
      const direction = event.translationX > 0 ? 'right' : 'left';
      const velocityMatches = (velocityX > 0 && direction === 'right') || (velocityX < 0 && direction === 'left');

      if (shouldSwipe && (absX > 35 || velocityMatches)) {
        const targetX = direction === 'right' ? SCREEN_WIDTH + 120 : -SCREEN_WIDTH - 120;
        opacity.value = withSpring(0, springConfig);
        translateX.value = withSpring(targetX, swipeOutConfig, (finished) => {
          if (finished) runOnJS(handleSwipeComplete)(direction);
        });
        translateY.value = withSpring(0, springConfig);
        rotate.value = withSpring(direction === 'right' ? 12 : -12, springConfig);
      } else {
        translateX.value = withSpring(0, springConfig);
        translateY.value = withSpring(0, springConfig);
        rotate.value = withSpring(0, springConfig);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  if (cards.length === 0 || renderIndex >= cards.length) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText type="title" style={[styles.emptyText, { color: colors.textSecondary }]}>
          No more cards to swipe!
        </ThemedText>
        <ThemedText style={[styles.emptySubtext, { color: colors.textSecondary }]}>
          Check back later for new matches
        </ThemedText>
      </View>
    );
  }

  const displayCards = cards.slice(renderIndex, renderIndex + 3);
  const currentCard = displayCards[0];

  const triggerSwipe = (direction: 'left' | 'right') => {
    const targetX = direction === 'right' ? SCREEN_WIDTH + 120 : -SCREEN_WIDTH - 120;
    opacity.value = withSpring(0, springConfig);
    translateX.value = withSpring(targetX, swipeOutConfig, (finished) => {
      if (finished) runOnJS(handleSwipeComplete)(direction);
    });
    translateY.value = withSpring(0, springConfig);
    rotate.value = withSpring(direction === 'right' ? 12 : -12, springConfig);
  };

  const cardBgColor = colorScheme === 'dark' ? colors.cardBackground : CARD_BG;

  const renderCard = (card: SwipeCardData, isTop: boolean) => (
    <View
      key={card.id}
      style={[
        styles.card,
        {
          backgroundColor: cardBgColor,
          borderColor: colors.border,
          transform: isTop ? undefined : [{ scale: 0.95 }, { translateY: 12 }],
          opacity: isTop ? 1 : 0.9,
        },
      ]}>
      <View style={styles.cardImageWrap}>
        <Image
          source={card.imageUri ?? DEFAULT_CARD_IMAGE}
          style={styles.cardImage}
          contentFit="cover"
        />
        <View style={styles.cardImageOverlay}>
          {isTop && topMatch && (
            <View style={[styles.topMatchBadge, { backgroundColor: colors.selectedFill, borderColor: colors.selectedOutline }]}>
              <MaterialCommunityIcons name="check" size={12} color="#000" />
              <ThemedText style={styles.topMatchText}>TOP MATCH</ThemedText>
            </View>
          )}
          <View style={[styles.stageBadge, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.stageBadgeText}>{getStageLabel(card.stage)}</ThemedText>
          </View>
          <ThemedText style={styles.cardOverlayTitle}>{card.name}</ThemedText>
          <ThemedText style={[styles.cardOverlayCompany, { color: colors.secondary }]}>by {card.company ?? 'Innovator'}</ThemedText>
        </View>
      </View>
      <View style={[styles.cardContent, { backgroundColor: cardBgColor }]}>
        <View style={styles.categoryPill}>
          <ThemedText style={[styles.categoryPillText, { color: colors.tint }]}>{card.category}</ThemedText>
        </View>
        <ThemedText style={[styles.cardDescription, { color: colors.text }]} numberOfLines={2}>{card.description}</ThemedText>
        <View style={styles.cardInfoRow}>
          <MaterialCommunityIcons name="lightning-bolt" size={14} color={colors.tint} />
          <ThemedText style={[styles.matchHint, { color: colors.textSecondary }]} numberOfLines={1}>{card.matchReason}</ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardStack}>
        {displayCards.slice(1).reverse().map((card, i) => (
          <View key={card.id} style={[styles.cardContainer, { zIndex: 1 + i }]}>
            {renderCard(card, false)}
          </View>
        ))}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardContainer, styles.cardContainerTop, animatedStyle]}>
            {renderCard(currentCard, true)}
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={[styles.actionButtons, { paddingBottom: bottomPadding + 16 }]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonOutline, { borderColor: colors.border }]}
          onPress={() => triggerSwipe('left')}
          activeOpacity={0.7}>
          <MaterialCommunityIcons name="close" size={28} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonOutline, { borderColor: colors.border }]}
          onPress={handleUndo}
          disabled={!lastSwiped}
          activeOpacity={0.7}>
          <MaterialCommunityIcons name="undo-variant" size={26} color={lastSwiped ? colors.tint : colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonPrimary, { backgroundColor: colors.selectedFill, borderColor: colors.selectedOutline }]}
          onPress={() => triggerSwipe('right')}
          activeOpacity={0.7}>
          <MaterialCommunityIcons name="heart" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  cardStack: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: CARD_HEIGHT,
  },
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerTop: {
    zIndex: 10,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  topMatchBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    zIndex: 2,
  },
  topMatchText: { fontSize: 11, fontWeight: '700', color: '#000' },
  stageBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    zIndex: 2,
  },
  stageBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  cardImageWrap: {
    height: IMAGE_HEIGHT,
    position: 'relative',
    backgroundColor: '#E8E0C8',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardOverlayTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardOverlayCompany: { fontSize: 14, fontWeight: '600' },
  cardContent: {
    padding: 16,
    paddingTop: 12,
    minHeight: CARD_CONTENT_HEIGHT,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(25,103,149,0.12)',
    marginBottom: 10,
  },
  categoryPillText: { fontSize: 12, fontWeight: '700' },
  cardDescription: { fontSize: 15, lineHeight: 22, marginBottom: 10 },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matchHint: { fontSize: 13, flex: 1 },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  actionButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  actionButtonPrimary: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: { fontSize: 22, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptySubtext: { fontSize: 15, textAlign: 'center' },
});
