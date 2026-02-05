import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useCallback, useState } from 'react';
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
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.65, 600);
const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 400;

const springConfig = { damping: 20, stiffness: 120 };
const swipeOutConfig = { damping: 18, stiffness: 90 };

export type SwipeCardData = {
  id: string;
  name: string;
  company?: string;
  category: string;
  stage: 'pilot' | 'earlyCommercial' | 'mature';
  description: string;
  matchReason: string;
  tags?: string[];
};

interface SwipeCardsProps {
  cards: SwipeCardData[];
  onSwipeLeft?: (card: SwipeCardData) => void;
  onSwipeRight?: (card: SwipeCardData) => void;
  topMatch?: boolean;
}

export function SwipeCards({ cards, onSwipeLeft, onSwipeRight, topMatch = true }: SwipeCardsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStack, setCardStack] = useState(cards.slice(0, 3));
  const [lastSwiped, setLastSwiped] = useState<{ card: SwipeCardData; direction: 'left' | 'right'; index: number } | null>(null);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const bottomPadding = Math.max(insets.bottom, 20);

  const isDark = colorScheme === 'dark';
  const cardBg = colors.cardBackground;
  const cardBorder = colors.border;
  const textPrimary = colors.text;
  const textSecondary = colors.textSecondary;
  const tagBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const topMatchBg = isDark ? 'rgba(196, 181, 80, 0.3)' : 'rgba(196, 181, 80, 0.25)';

  const getStageLabel = (stage: 'pilot' | 'earlyCommercial' | 'mature') => {
    switch (stage) {
      case 'pilot':
        return 'Pilot Tech';
      case 'earlyCommercial':
        return 'Early Commercial';
      case 'mature':
        return 'Mature Tech';
    }
  };

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      const currentCard = cards[currentIndex];
      setLastSwiped({ card: currentCard, direction, index: currentIndex });

      if (direction === 'left' && onSwipeLeft) onSwipeLeft(currentCard);
      else if (direction === 'right' && onSwipeRight) onSwipeRight(currentCard);

      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        const nextIndex = currentIndex + 1;
        setCardStack(cards.slice(nextIndex, nextIndex + 3));
      }

      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      opacity.value = 1;
    },
    [currentIndex, cards, onSwipeLeft, onSwipeRight, translateX, translateY, rotate, opacity]
  );

  const handleUndo = useCallback(() => {
    if (!lastSwiped || currentIndex === 0) return;
    setCurrentIndex(lastSwiped.index);
    setCardStack(cards.slice(lastSwiped.index, lastSwiped.index + 3));
    setLastSwiped(null);
  }, [lastSwiped, currentIndex, cards]);

  const panGesture = Gesture.Pan()
    .minDistance(8)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      rotate.value = (event.translationX / CARD_WIDTH) * 12;
    })
    .onEnd((event) => {
      const absX = Math.abs(event.translationX);
      const velocityX = event.velocityX;
      const shouldSwipe =
        absX > SWIPE_THRESHOLD || Math.abs(velocityX) > VELOCITY_THRESHOLD;
      const direction = event.translationX > 0 ? 'right' : 'left';
      const velocityMatchesDirection =
        (velocityX > 0 && direction === 'right') || (velocityX < 0 && direction === 'left');

      if (shouldSwipe && (absX > 40 || velocityMatchesDirection)) {
        const targetX = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
        opacity.value = withSpring(0, springConfig);
        translateX.value = withSpring(
          targetX,
          swipeOutConfig,
          (finished) => {
            if (finished) runOnJS(handleSwipeComplete)(direction);
          }
        );
        translateY.value = withSpring(0, springConfig);
        rotate.value = withSpring(direction === 'right' ? 15 : -15, springConfig);
      } else {
        translateX.value = withSpring(0, springConfig);
        translateY.value = withSpring(0, springConfig);
        rotate.value = withSpring(0, springConfig);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText type="title" style={[styles.emptyText, { color: textSecondary }]}>
          No more cards to swipe!
        </ThemedText>
        <ThemedText style={[styles.emptySubtext, { color: textSecondary }]}>
          Check back later for new matches
        </ThemedText>
      </View>
    );
  }

  const currentCard = cards[currentIndex];
  const tags = currentCard.tags ?? [getStageLabel(currentCard.stage), currentCard.category];

  const triggerSwipe = (direction: 'left' | 'right') => {
    const targetX = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    opacity.value = withSpring(0, springConfig);
    translateX.value = withSpring(
      targetX,
      swipeOutConfig,
      (finished) => {
        if (finished) runOnJS(handleSwipeComplete)(direction);
      }
    );
    translateY.value = withSpring(0, springConfig);
    rotate.value = withSpring(direction === 'right' ? 15 : -15, springConfig);
  };

  return (
    <View style={styles.container}>
      {/* Background cards */}
      {cardStack.slice(1).map((card, index) => (
        <View
          key={card.id}
          style={[
            styles.cardContainer,
            { transform: [{ scale: 1 - (index + 1) * 0.05 }, { translateY: (index + 1) * 8 }], opacity: 0.6 - index * 0.2 },
          ]}>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.cardImage, { backgroundColor: colors.tint + '35' }]} />
            <View style={styles.cardContent}>
              <ThemedText style={[styles.cardTitle, { color: textPrimary }]}>{card.name}</ThemedText>
              <ThemedText style={[styles.cardCompany, { color: colors.tint }]}>by {card.company ?? 'Innovator'}</ThemedText>
            </View>
          </View>
        </View>
      ))}

      {/* Top card - swipeable */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            {topMatch && (
              <View style={[styles.topMatchBadge, { backgroundColor: topMatchBg }]}>
                <MaterialCommunityIcons name="check" size={12} color={colors.text} />
                <ThemedText style={[styles.topMatchText, { color: textPrimary }]}>TOP MATCH</ThemedText>
              </View>
            )}
            <View style={[styles.cardImage, { backgroundColor: colors.tint + '35' }]} />
            <View style={styles.cardContent}>
              <ThemedText style={[styles.cardTitle, { color: textPrimary }]}>{currentCard.name}</ThemedText>
              <ThemedText style={[styles.cardCompany, { color: colors.tint }]}>by {currentCard.company ?? 'CareTech Innovators'}</ThemedText>
              <View style={styles.tagsRow}>
                {tags.map((tag) => (
                  <View
                    key={tag}
                    style={[
                      styles.tag,
                      { backgroundColor: tagBg },
                      tag.toLowerCase().includes('looking') && { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.tint },
                    ]}>
                    <ThemedText style={[styles.tagText, { color: textPrimary }]}>{tag}</ThemedText>
                  </View>
                ))}
              </View>
              <View style={[styles.matchReasonBox, { borderTopColor: cardBorder }]}>
                <MaterialCommunityIcons name="lightning-bolt" size={16} color={colors.tint} style={styles.matchIcon} />
                <ThemedText style={[styles.matchReasonLabel, { color: textSecondary }]}>GOOD FIT BECAUSE...</ThemedText>
                <ThemedText style={[styles.matchReasonText, { color: textPrimary }]}>{currentCard.matchReason}</ThemedText>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Action buttons: X, undo, heart - subtle outline style */}
      <View style={[styles.actionButtons, { paddingBottom: bottomPadding + 20 }]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSubtle, { borderColor: colors.border }]}
          onPress={() => triggerSwipe('left')}
          activeOpacity={0.7}>
          <MaterialCommunityIcons name="close" size={26} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSubtle, { borderColor: colors.border }]}
          onPress={handleUndo}
          disabled={!lastSwiped}
          activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="undo-variant"
            size={24}
            color={lastSwiped ? colors.tint : colors.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.actionButtonSubtle,
            styles.likeButtonSize,
            { borderColor: colors.tint },
          ]}
          onPress={() => triggerSwipe('right')}
          activeOpacity={0.7}>
          <MaterialCommunityIcons name="heart-outline" size={28} color={colors.tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
  },
  topMatchBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    zIndex: 1,
  },
  topMatchText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardImage: {
    height: 140,
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardCompany: {
    fontSize: 14,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchReasonBox: {
    paddingTop: 12,
    borderTopWidth: 1,
  },
  matchIcon: { marginBottom: 6 },
  matchReasonLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  matchReasonText: {
    fontSize: 15,
    lineHeight: 22,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonSubtle: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  likeButtonSize: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
});
