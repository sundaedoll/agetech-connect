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

const OPTIONS = ["Conservative", "Open", "Very open / early adopter"];

const TOTAL_STEPS = 5;
const STEP = 5;

export default function Survey5Screen() {
  const { state, setRiskTolerance } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string | null>(state.riskTolerance);

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
        {OPTIONS.map((label) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.optionCard,
              selected === label && styles.optionCardSelected,
            ]}
            onPress={() => setSelected(label)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.optionLabel}>{label}</ThemedText>
            <View
              style={[
                styles.radioOuter,
                selected === label && styles.radioOuterSelected,
              ]}
            >
              {selected === label && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

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
          <MaterialIcons name="check" size={22} color="#FFFFFF" />
          <ThemedText style={styles.continueBtnText}>Finish Setup</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 },
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
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 6,
  },
  subtitle: { fontSize: 14, color: TEXT_SECONDARY },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 18,
    marginBottom: 12,
  },
  optionCardSelected: { borderColor: TrustTeal, borderWidth: 2 },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_PRIMARY,
    flex: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: TrustTeal },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: TrustTeal,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    marginTop: 8,
  },
  infoCardIcon: { marginRight: 14 },
  infoCardTextWrap: { flex: 1 },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  infoCardSubtitle: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  footer: { paddingHorizontal: 24, paddingVertical: 24 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TrustTeal,
    borderRadius: 14,
    paddingVertical: 18,
    gap: 10,
  },
  continueBtnDisabled: { backgroundColor: BORDER, opacity: 0.8 },
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
});
