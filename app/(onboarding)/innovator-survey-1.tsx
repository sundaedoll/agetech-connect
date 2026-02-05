/**
 * Innovators & Companies: A. Technology Stage (Required) - Single-select
 * Unique design: stage journey timeline with numbered nodes and descriptions
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
const BORDER = "#3d4f5f";
const CARD_BG = "#252d3a";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#9CA3AF";
const CARD_BORDER = TrustTeal;

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const STAGES: Array<{
  label: string;
  description: string;
  icon: IconName;
}> = [
  {
    label: "Pilot / pre-commercial",
    description: "Testing prototypes, gathering feedback, pre-launch.",
    icon: "flask-outline",
  },
  {
    label: "Early commercial",
    description: "First customers, product-market fit, scaling up.",
    icon: "rocket-launch-outline",
  },
  {
    label: "Mature / scaled solution",
    description: "Proven at scale, established market presence.",
    icon: "chart-line-variant",
  },
];

const TOTAL_STEPS = 5;
const STEP = 1;

export default function InnovatorSurvey1Screen() {
  const { state, setTechnologyStage } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string | null>(state.technologyStage);

  const handleContinue = () => {
    if (selected) {
      setTechnologyStage(selected);
      router.push("./innovator-survey-2" as any);
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
          What stage is your technology currently at?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Select one to help us match you with the right partners.
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.journeyWrap}>
          {STAGES.map(({ label, description, icon }, index) => {
            const isSelected = selected === label;
            const stepNum = index + 1;
            const isPast = STAGES.findIndex((s) => s.label === selected) > index;
            const lineActive = isSelected || isPast;

            return (
              <View key={label} style={styles.stageRow}>
                <View style={styles.trackCol}>
                  <View
                    style={[
                      styles.nodeCircle,
                      isSelected && styles.nodeCircleSelected,
                      isPast && !isSelected && styles.nodeCircleDone,
                    ]}
                  >
                    {isPast && !isSelected ? (
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    ) : (
                      <ThemedText
                        style={[
                          styles.nodeNum,
                          isSelected && styles.nodeNumSelected,
                        ]}
                      >
                        {stepNum}
                      </ThemedText>
                    )}
                  </View>
                  {index < STAGES.length - 1 && (
                    <View
                      style={[
                        styles.trackLine,
                        lineActive && styles.trackLineActive,
                      ]}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.stageCard,
                    isSelected && styles.stageCardSelected,
                  ]}
                  onPress={() => setSelected(label)}
                  activeOpacity={0.8}
                >
                  <View style={styles.stageIconWrap}>
                    <MaterialCommunityIcons
                      name={icon}
                      size={28}
                      color={isSelected ? TrustTeal : TEXT_SECONDARY}
                    />
                  </View>
                  <View style={styles.stageTextWrap}>
                    <ThemedText style={styles.stageLabel}>{label}</ThemedText>
                    <ThemedText style={styles.stageDescription} numberOfLines={2}>
                      {description}
                    </ThemedText>
                  </View>
                  {isSelected && (
                    <View style={styles.checkWrap}>
                      <MaterialIcons name="check-circle" size={24} color={TrustTeal} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
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
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: { fontSize: 16, color: TEXT_SECONDARY, lineHeight: 22 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  journeyWrap: { paddingLeft: 4 },
  stageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  trackCol: {
    width: 36,
    alignItems: "center",
    marginRight: 12,
  },
  nodeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: CARD_BG,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeCircleSelected: {
    backgroundColor: TrustTeal,
    borderColor: TrustTeal,
  },
  nodeCircleDone: {
    backgroundColor: TrustTeal,
    borderColor: TrustTeal,
  },
  nodeNum: {
    fontSize: 14,
    fontWeight: "700",
    color: TEXT_SECONDARY,
  },
  nodeNumSelected: { color: "#FFFFFF" },
  trackLine: {
    width: 2,
    minHeight: 56,
    backgroundColor: BORDER,
    marginVertical: 4,
  },
  trackLineActive: { backgroundColor: TrustTeal },
  stageCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: BORDER,
    padding: 18,
    minHeight: 100,
  },
  stageCardSelected: {
    borderColor: CARD_BORDER,
    borderWidth: 2,
    backgroundColor: "rgba(0, 128, 128, 0.12)",
  },
  stageIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  stageTextWrap: { flex: 1, marginRight: 8 },
  stageLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  stageDescription: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 18,
  },
  checkWrap: { marginLeft: 4 },
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
