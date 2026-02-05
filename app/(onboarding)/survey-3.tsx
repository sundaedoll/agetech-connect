/**
 * C. Technology Categories - What types of aging technologies are you interested in? (Multi-select)
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
const ICON_TINT = "#5b9aa0";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const OPTIONS: Array<{ label: string; description: string; icon: IconName }> = [
  { label: "Assistive Tech", description: "Smart home tools & aids", icon: "arm-flex" },
  { label: "Mobility", description: "Fall prevention & safety", icon: "walk" },
  { label: "Dementia", description: "Memory & cognitive aids", icon: "head-heart" },
  { label: "Monitoring", description: "Health & remote tracking", icon: "shield-check" },
  { label: "Social Care", description: "Loneliness & connection", icon: "account-group" },
  { label: "Medication", description: "Management & reminders", icon: "pill" },
  { label: "Long-term care", description: "Care & living solutions", icon: "home-heart" },
  { label: "Finance & planning", description: "Care coordination", icon: "chart-box" },
];

const TOTAL_STEPS = 5;
const STEP = 3;

export default function Survey3Screen() {
  const { state, setTechnologyCategories } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(
    state.technologyCategories,
  );

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setTechnologyCategories(selected);
    router.push("./survey-4" as any);
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
          What types of aging technologies are you interested in?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Select all that apply to personalize your matches.
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardGrid}>
          {OPTIONS.map(({ label, description, icon }) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionCard,
                selected.includes(label) && styles.optionCardSelected,
              ]}
              onPress={() => toggle(label)}
              activeOpacity={0.8}
            >
              {selected.includes(label) && (
                <View style={styles.checkBadge}>
                  <MaterialIcons name="check" size={14} color="#FFFFFF" />
                </View>
              )}
              <MaterialCommunityIcons
                name={icon}
                size={32}
                color={selected.includes(label) ? TrustTeal : ICON_TINT}
                style={styles.optionIcon}
              />
              <ThemedText style={styles.optionLabel}>{label}</ThemedText>
              <ThemedText style={styles.optionDescription} numberOfLines={2}>
                {description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
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
          <ThemedText style={styles.continueBtnText}>Next</ThemedText>
          <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>
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
    marginBottom: 10,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    lineHeight: 22,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionCard: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: CARD_BG,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  optionCardSelected: { borderColor: TrustTeal, borderWidth: 2 },
  checkBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: TrustTeal,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    marginTop: 8,
    marginBottom: 10,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 16,
  },
  footer: { paddingHorizontal: 24, paddingVertical: 24 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TrustTeal,
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  continueBtnDisabled: { backgroundColor: BORDER, opacity: 0.8 },
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
});
