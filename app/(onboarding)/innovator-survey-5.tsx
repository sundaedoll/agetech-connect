/**
 * Innovators & Companies: E. Readiness for Engagement - Multi-select + Finish
 */
import { ThemedText } from "@/components/themed-text";
import { TrustTeal } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#1a1f2e";
const CARD_BG = "#364652";
const BORDER = "#3d4f5f";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#9CA3AF";
const CARD_BORDER = TrustTeal;
const CARD_SELECTED_BG = "rgba(0, 128, 128, 0.15)";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const OPTIONS: Array<{ label: string; description: string; icon: IconName }> = [
  {
    label: "Families",
    description: "B2C / Individual Caregivers. Solutions for home-based care.",
    icon: "account-group",
  },
  {
    label: "Care facilities",
    description: "B2B / Organizations. Solutions for nursing homes or assisted living.",
    icon: "domain",
  },
  {
    label: "Both",
    description: "Hybrid. My solution is versatile and ready for all caregiver types.",
    icon: "link-variant",
  },
];

const TOTAL_STEPS = 5;
const STEP = 5;

export default function InnovatorSurvey5Screen() {
  const { state, setReadinessForEngagement } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.readinessForEngagement);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setReadinessForEngagement(selected);
    router.replace("../(tabs)" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.progressRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                i + 1 === STEP && styles.progressDotActive,
                i < STEP && styles.progressDotDone,
              ]}
            />
          ))}
        </View>
        <ThemedText style={styles.title}>
          Who are you best suited to work with right now?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Select all that apply to your current solution readiness.
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {OPTIONS.map(({ label, description, icon }) => {
          const isSelected = selected.includes(label);
          return (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
              onPress={() => toggle(label)}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconWrap}>
                <MaterialCommunityIcons
                  name={icon}
                  size={32}
                  color={isSelected ? TrustTeal : TEXT_SECONDARY}
                />
              </View>
              <View style={styles.cardTextWrap}>
                <ThemedText style={styles.optionLabel}>{label}</ThemedText>
                <ThemedText style={styles.optionDescription} numberOfLines={2}>
                  {description}
                </ThemedText>
              </View>
              <View
                style={[
                  styles.radioCircle,
                  isSelected && styles.radioCircleSelected,
                ]}
              >
                {isSelected && (
                  <MaterialIcons name="check" size={18} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            selected.length === 0 && styles.continueBtnDisabled,
          ]}
          onPress={handleContinue}
          disabled={selected.length === 0}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.continueBtnText}>Start Matching</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.disclaimer}>
          By continuing, you agree to our Terms of Service.
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 20 },
  progressRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BORDER,
  },
  progressDotActive: { width: 24, borderRadius: 4, backgroundColor: TrustTeal },
  progressDotDone: { backgroundColor: TrustTeal },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: { fontSize: 16, color: TEXT_SECONDARY, lineHeight: 22 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: BORDER,
    padding: 18,
    marginBottom: 16,
    minHeight: 96,
  },
  optionCardSelected: {
    borderColor: TrustTeal,
    borderWidth: 2,
    backgroundColor: CARD_SELECTED_BG,
  },
  cardIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardTextWrap: { flex: 1, marginRight: 12 },
  optionLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 18,
  },
  radioCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    backgroundColor: TrustTeal,
    borderColor: TrustTeal,
  },
  footer: { paddingHorizontal: 24, paddingVertical: 24 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TrustTeal,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  continueBtnDisabled: { backgroundColor: BORDER, opacity: 0.8 },
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
  disclaimer: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 18,
  },
});
