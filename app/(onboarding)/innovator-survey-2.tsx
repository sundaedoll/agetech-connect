/**
 * Innovators & Companies: B. What They're Looking For - Multi-select
 */
import { ThemedText } from "@/components/themed-text";
import { TrustTeal } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
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

const OPTIONS = [
  "Pilot sites",
  "Early adopters",
  "User feedback / co-design partners",
  "Sales opportunities",
  "Research or validation partners",
];

const TOTAL_STEPS = 5;
const STEP = 2;

export default function InnovatorSurvey2Screen() {
  const { state, setSeekingThroughPlatform } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.seekingThroughPlatform);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setSeekingThroughPlatform(selected);
    router.push("./innovator-survey-3" as any);
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
          What are you primarily seeking through Agetech Connect?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Select all that apply.
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {OPTIONS.map((label) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.optionCard,
              selected.includes(label) && styles.optionCardSelected,
            ]}
            onPress={() => toggle(label)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.optionLabel}>{label}</ThemedText>
            <View
              style={[
                styles.checkbox,
                selected.includes(label) && styles.checkboxSelected,
              ]}
            >
              {selected.includes(label) && (
                <MaterialIcons name="check" size={18} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
        ))}
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
  subtitle: { fontSize: 16, color: TEXT_SECONDARY, lineHeight: 22 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    padding: 24,
    marginBottom: 16,
    minHeight: 88,
  },
  optionCardSelected: { borderColor: TrustTeal, borderWidth: 2 },
  optionLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    flex: 1,
    marginRight: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: CARD_BORDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxSelected: {
    backgroundColor: TrustTeal,
    borderColor: TrustTeal,
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
