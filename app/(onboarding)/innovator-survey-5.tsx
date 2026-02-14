/**
 * Innovators & Companies: E. Readiness for Engagement - Multi-select + Finish
 */
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setReadinessForEngagement, setInnovatorProfile } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.readinessForEngagement);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setReadinessForEngagement(selected);
    setInnovatorProfile({ technologyStage: state.technologyStage ?? "" });
    router.replace("./innovator-profile-1" as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.progressRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                { backgroundColor: i < STEP || i + 1 === STEP ? colors.accent : colors.border },
                i + 1 === STEP && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
        <ThemedText style={[styles.title, { color: colors.text }]}>
          Who are you best suited to work with right now?
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
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
                { backgroundColor: colors.cardBackground, borderColor: colors.border },
                isSelected && { borderColor: colors.tint, borderWidth: 2, backgroundColor: colors.tint + "25" },
              ]}
              onPress={() => toggle(label)}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIconWrap, { backgroundColor: colors.secondary + "20" }]}>
                <MaterialCommunityIcons
                  name={icon}
                  size={32}
                  color={isSelected ? colors.tint : colors.textSecondary}
                />
              </View>
              <View style={styles.cardTextWrap}>
                <ThemedText style={[styles.optionLabel, { color: colors.text }]}>{label}</ThemedText>
                <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                  {description}
                </ThemedText>
              </View>
              <View
                style={[
                  styles.radioCircle,
                  { borderColor: colors.border },
                  isSelected && { backgroundColor: colors.selectedFill, borderColor: colors.selectedOutline },
                ]}
              >
                {isSelected && (
                  <MaterialIcons name="check" size={18} color={colors.tint} />
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
            { backgroundColor: selected.length > 0 ? colors.tint : colors.border },
          ]}
          onPress={handleContinue}
          disabled={selected.length === 0}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.continueBtnText}>Start Matching</ThemedText>
        </TouchableOpacity>
        <ThemedText style={[styles.disclaimer, { color: colors.textSecondary }]}>
          By continuing, you agree to our Terms of Service.
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 20 },
  progressRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  progressDot: { width: 8, height: 8, borderRadius: 4 },
  progressDotActive: { width: 24, borderRadius: 4 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 12, lineHeight: 32 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 18,
    marginBottom: 16,
    minHeight: 96,
  },
  cardIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardTextWrap: { flex: 1, marginRight: 12 },
  optionLabel: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  optionDescription: { fontSize: 13, lineHeight: 18 },
  radioCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { paddingHorizontal: 24, paddingVertical: 24 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
  disclaimer: { fontSize: 13, textAlign: "center", lineHeight: 18 },
});
