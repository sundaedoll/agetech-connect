/**
 * E. Risk Tolerance (Simple)
 * How comfortable are you trying new technologies? (3-option select)
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

const OPTIONS = ["Conservative", "Open", "Early Adopter"];
const SEGMENT_BG = "#2a3235";
const SEGMENT_SELECTED_BG = "#353B3C";

const TOTAL_STEPS = 5;
const STEP = 5;

const LEGACY_MAP: Record<string, string> = {
  "Very open / early adopter": "Early Adopter",
};

export default function Survey5Screen() {
  const { state, setRiskTolerance } = useOnboardingSurvey();
  const initial = state.riskTolerance
    ? (LEGACY_MAP[state.riskTolerance] ?? state.riskTolerance)
    : null;
  const [selected, setSelected] = useState<string | null>(initial);

  const handleContinue = () => {
    if (selected) {
      setRiskTolerance(selected);
      router.replace("../(tabs)" as any);
    }
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
          How comfortable are you trying new technologies?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          This helps us match you with innovators whose products fit your
          preferred pace of adoption and risk profile.
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.segmentWrap}>
          {OPTIONS.map((label) => {
            const isSelected = selected === label;
            return (
              <TouchableOpacity
                key={label}
                style={[styles.segmentBtn, isSelected && styles.segmentBtnSelected]}
                onPress={() => setSelected(label)}
                activeOpacity={0.8}
              >
                <ThemedText
                  style={[styles.segmentLabel, isSelected && styles.segmentLabelSelected]}
                  numberOfLines={1}
                >
                  {label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons
            name="rocket-launch"
            size={28}
            color={TrustTeal}
            style={styles.infoCardIcon}
          />
          <View style={styles.infoCardTextWrap}>
            <ThemedText style={styles.infoCardTitle}>
              Innovation Matcher
            </ThemedText>
            <ThemedText style={styles.infoCardSubtitle}>
              We'll show you tech that fits this profile.
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.continueBtnText}>Finish Setup</ThemedText>
          <View style={styles.continueBtnBadge}>
            <MaterialIcons name="check" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <ThemedText style={styles.disclaimer}>
          By finishing, you agree to our Terms of Service and Privacy Policy.
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
  subtitle: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    lineHeight: 22,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  segmentWrap: {
    flexDirection: "row",
    backgroundColor: SEGMENT_BG,
    borderRadius: 999,
    padding: 4,
    marginBottom: 24,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentBtnSelected: {
    backgroundColor: TrustTeal,
  },
  segmentLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_SECONDARY,
  },
  segmentLabelSelected: {
    color: "#FFFFFF",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SEGMENT_SELECTED_BG,
    borderRadius: 16,
    padding: 20,
  },
  infoCardIcon: { marginRight: 16 },
  infoCardTextWrap: { flex: 1 },
  infoCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  infoCardSubtitle: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 20,
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
    gap: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  continueBtnDisabled: { backgroundColor: BORDER, opacity: 0.8 },
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
  continueBtnBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimer: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 18,
  },
});
