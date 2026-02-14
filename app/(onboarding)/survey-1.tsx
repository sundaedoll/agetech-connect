/**
 * A. Adoption Readiness - What type of technologies are you open to? (Multi-select)
 */
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OPTIONS: Array<{ label: string; description: string }> = [
  {
    label: "Pilot / research stage",
    description:
      "Be among the first to test innovative prototypes and provide feedback to creators.",
  },
  {
    label: "Early commercial / early adopters",
    description:
      "Access market-ready solutions that are gaining their first set of users.",
  },
  {
    label: "Fully mature / proven technologies only",
    description:
      "Focus on reliable, highly-tested technologies with widespread adoption.",
  },
];

const TOTAL_STEPS = 5;
const STEP = 1;

export default function Survey1Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setAdoptionReadiness } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.adoptionReadiness);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    );
  };

  const handleContinue = () => {
    setAdoptionReadiness(selected);
    router.push("./survey-2" as any);
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
          What type of technologies are you open to?
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select all that apply to your current facility or household needs.
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {OPTIONS.map(({ label, description }) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.optionCard,
              { backgroundColor: colors.cardBackground, borderColor: colors.border },
              selected.includes(label) && { borderColor: colors.selectedOutline, borderWidth: 2, backgroundColor: colors.selectedFill },
            ]}
            onPress={() => toggle(label)}
            activeOpacity={0.8}
          >
            <View style={styles.optionTextWrap}>
              <ThemedText style={[styles.optionLabel, { color: colors.text }]}>{label}</ThemedText>
              <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]}>
                {description}
              </ThemedText>
            </View>
            <View
              style={[
                styles.checkbox,
                { borderColor: colors.border },
                selected.includes(label) && { backgroundColor: colors.selectedFill, borderColor: colors.selectedOutline },
              ]}
            >
              {selected.includes(label) && (
                <MaterialIcons name="check" size={18} color={colors.tint} />
              )}
            </View>
          </TouchableOpacity>
        ))}
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
          <ThemedText style={styles.continueBtnText}>Next</ThemedText>
          <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>
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
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressDotActive: { width: 24, borderRadius: 4 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  subtitle: { fontSize: 14 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 24,
    marginBottom: 16,
    minHeight: 100,
  },
  optionTextWrap: { flex: 1, marginRight: 16 },
  optionLabel: { fontSize: 17, fontWeight: "700", marginBottom: 6 },
  optionDescription: { fontSize: 14, lineHeight: 20 },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  footer: { paddingHorizontal: 24, paddingVertical: 24 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
});
