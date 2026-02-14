/**
 * B. Engagement Intent - What are you open to doing with a technology provider? (Multi-select)
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

const OPTIONS = [
  "Participate in pilot programs",
  "Provide user feedback / co-design",
  "Purchase / procurement conversations",
  "Exploration only (learning / discovery)",
];

const TOTAL_STEPS = 5;
const STEP = 2;

export default function Survey2Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setEngagementIntent } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.engagementIntent);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setEngagementIntent(selected);
    router.push("./survey-3" as any);
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
          What are you open to doing with a technology provider?
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select all the ways you'd like to engage with innovators on our platform.
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
              { backgroundColor: colors.cardBackground, borderColor: colors.border },
              selected.includes(label) && { borderColor: colors.selectedOutline, borderWidth: 2, backgroundColor: colors.selectedFill },
            ]}
            onPress={() => toggle(label)}
            activeOpacity={0.8}
          >
            <ThemedText style={[styles.optionLabel, { color: colors.text }]}>{label}</ThemedText>
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
          <ThemedText style={styles.continueBtnText}>Continue</ThemedText>
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
  progressDot: { width: 8, height: 8, borderRadius: 4 },
  progressDotActive: { width: 24, borderRadius: 4 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10, lineHeight: 32 },
  subtitle: { fontSize: 16, lineHeight: 22 },
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
    minHeight: 88,
  },
  optionLabel: { fontSize: 18, fontWeight: "700", flex: 1, marginRight: 16 },
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
