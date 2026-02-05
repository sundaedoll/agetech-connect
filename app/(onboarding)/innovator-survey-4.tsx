/**
 * Innovators & Companies: D. Deployment Setting - Multi-select
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

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

const SECTIONS: Array<{
  title: string;
  options: Array<{ label: string; icon: IconName }>;
}> = [
  {
    title: "Home & independent",
    options: [
      { label: "Private home", icon: "home" },
      { label: "Retirement community", icon: "apartment" },
    ],
  },
  {
    title: "Care & community",
    options: [
      { label: "Assisted living", icon: "favorite" },
      { label: "Long-term care", icon: "local-hospital" },
      { label: "Community / outpatient", icon: "groups" },
    ],
  },
];

const TOTAL_STEPS = 5;
const STEP = 4;

export default function InnovatorSurvey4Screen() {
  const { state, setDeploymentSetting } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.deploymentSetting);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setDeploymentSetting(selected);
    router.push("./innovator-survey-5" as any);
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
          Where is your technology intended to be used?
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
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.sectionGrid}>
              {section.options.map(({ label, icon }) => {
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
                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <MaterialIcons name="check" size={14} color="#FFFFFF" />
                      </View>
                    )}
                    <View style={styles.cardIconWrap}>
                      <MaterialIcons
                        name={icon}
                        size={28}
                        color={isSelected ? "#FFFFFF" : TrustTeal}
                      />
                    </View>
                    <ThemedText
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                      numberOfLines={2}
                    >
                      {label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
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
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: TEXT_SECONDARY,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionCard: {
    width: "48%",
    minHeight: 120,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  optionCardSelected: {
    borderColor: TrustTeal,
    borderWidth: 2,
    backgroundColor: "rgba(0, 128, 128, 0.2)",
  },
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
  cardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(0, 128, 128, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    textAlign: "center",
  },
  optionLabelSelected: { color: "#FFFFFF" },
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
