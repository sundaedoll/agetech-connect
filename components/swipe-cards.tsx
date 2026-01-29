import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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
// Calculate card height based on screen size - iPhone compatible
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.65, 600);
const SWIPE_THRESHOLD = 120;

export type SwipeCardData = {
  id: string;
  name: string;
  category: string;
  stage: 'pilot' | 'earlyCommercial' | 'mature';
  description: string;
  matchReason?: string;
};

interface SwipeCardsProps {
  cards: SwipeCardData[];
  onSwipeLeft?: (card: SwipeCardData) => void;
  onSwipeRight?: (card: SwipeCardData) => void;
}

export function SwipeCards({ cards, onSwipeLeft, onSwipeRight }: SwipeCardsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStack, setCardStack] = useState(cards.slice(0, 3)); // Show 3 cards at a time

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  
  // Calculate bottom padding for action buttons (iPhone home indicator safe area)
  const bottomPadding = Math.max(insets.bottom, 20);

  const getStageLabel = (stage: 'pilot' | 'earlyCommercial' | 'mature') => {
    switch (stage) {
      case 'pilot':
        return 'Pilot';
      case 'earlyCommercial':
        return 'Early Commercial';
      case 'mature':
        return 'Mature';
    }
  };

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      const currentCard = cards[currentIndex];
      if (direction === 'left' && onSwipeLeft) {
        onSwipeLeft(currentCard);
      } else if (direction === 'right' && onSwipeRight) {
        onSwipeRight(currentCard);
      }

      // Move to next card
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        // Update card stack
        const nextIndex = currentIndex + 1;
        const newStack = cards.slice(nextIndex, nextIndex + 3);
        setCardStack(newStack);
      }

      // Reset animation values
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      opacity.value = 1;
    },
    [currentIndex, cards, onSwipeLeft, onSwipeRight, translateX, translateY, rotate, opacity]
  );

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = (event.translationX / CARD_WIDTH) * 20;
    })
    .onEnd((event) => {
      const absX = Math.abs(event.translationX);
      const absY = Math.abs(event.translationY);

      if (absX > SWIPE_THRESHOLD || absY > SWIPE_THRESHOLD) {
        // Swipe detected
        const direction = event.translationX > 0 ? 'right' : 'left';
        opacity.value = withSpring(0);
        translateX.value = withSpring(
          direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100,
          {},
          () => {
            runOnJS(handleSwipeComplete)(direction);
          }
        );
      } else {
        // Spring back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
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
        <ThemedText type="title" style={[styles.emptyText, { color: colors.textSecondary }]}>
          No more cards to swipe!
        </ThemedText>
        <ThemedText style={[styles.emptySubtext, { color: colors.textSecondary }]}>
          Check back later for new matches
        </ThemedText>
      </View>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <View style={styles.container}>
      {/* Background cards */}
      {cardStack.slice(1).map((card, index) => (
        <View
          key={card.id}
          style={[
            styles.cardContainer,
            {
              transform: [{ scale: 1 - (index + 1) * 0.05 }, { translateY: (index + 1) * 10 }],
              opacity: 0.7 - index * 0.2,
            },
          ]}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText type="title" style={styles.cardTitle}>
                  {card.name}
                </ThemedText>
                <Badge variant={card.stage} label={getStageLabel(card.stage)} />
              </View>
              <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
                {card.category}
              </ThemedText>
            </View>
          </Card>
        </View>
      ))}

      {/* Top card - swipeable */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText type="title" style={styles.cardTitle}>
                  {currentCard.name}
                </ThemedText>
                <Badge variant={currentCard.stage} label={getStageLabel(currentCard.stage)} />
              </View>
              <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
                {currentCard.category}
              </ThemedText>
              <ThemedText style={[styles.description, { color: colors.text }]}>
                {currentCard.description}
              </ThemedText>
              {currentCard.matchReason && (
                <View style={styles.matchReasonContainer}>
                  <ThemedText style={[styles.matchReason, { color: colors.tint }]}>
                    {currentCard.matchReason}
                  </ThemedText>
                </View>
              )}
            </View>
          </Card>
        </Animated.View>
      </GestureDetector>

      {/* Action buttons */}
      <View style={[styles.actionButtons, { paddingBottom: bottomPadding + 20 }]}>
        <View
          style={[styles.actionButton, styles.passButton, { backgroundColor: colors.error + '20' }]}
          onTouchEnd={() => {
            translateX.value = withSpring(-SCREEN_WIDTH - 100);
            opacity.value = withSpring(0, {}, () => {
              runOnJS(handleSwipeComplete)('left');
            });
          }}>
          <ThemedText style={[styles.actionButtonText, { color: colors.error }]}>✕</ThemedText>
        </View>
        <View
          style={[styles.actionButton, styles.likeButton, { backgroundColor: colors.success + '20' }]}
          onTouchEnd={() => {
            translateX.value = withSpring(SCREEN_WIDTH + 100);
            opacity.value = withSpring(0, {}, () => {
              runOnJS(handleSwipeComplete)('right');
            });
          }}>
          <ThemedText style={[styles.actionButtonText, { color: colors.success }]}>♥</ThemedText>
        </View>
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
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    flex: 1,
  },
  matchReasonContainer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  matchReason: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0, // Will be set dynamically
    flexDirection: 'row',
    gap: 24,
    paddingBottom: 0, // Will be set dynamically
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passButton: {},
  likeButton: {},
  actionButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
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
