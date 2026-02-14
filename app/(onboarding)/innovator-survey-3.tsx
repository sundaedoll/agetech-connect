/**
 * Innovators & Companies: C. Technology Category - Multi-select
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
  { label: "Assistive technology", description: "Smart home tools & aids", icon: "arm-flex" },
  { label: "Long-term care solutions", description: "Care & living solutions", icon: "home-heart" },
  { label: "Retirement living solutions", description: "Independent living", icon: "home-city" },
  { label: "Mobility & fall prevention", description: "Fall prevention & safety", icon: "walk" },
  { label: "Social connection & companionship", description: "Loneliness & connection", icon: "account-group" },
  { label: "Cognitive / dementia support", description: "Memory & cognitive aids", icon: "head-heart" },
  { label: "Remote monitoring & safety", description: "Health & remote tracking", icon: "shield-check" },
  { label: "Finance / planning / care coordination", description: "Care coordination", icon: "chart-box" },
];

const TOTAL_STEPS = 5;
const STEP = 3;

export default function InnovatorSurvey3Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setInnovatorTechnologyCategories } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(
    state.innovatorTechnologyCategories,
  );

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setInnovatorTechnologyCategories(selected);
    router.push("./innovator-survey-4" as any);
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
          What category best describes your solution?
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select all that apply.
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
                { backgroundColor: colors.cardBackground, borderColor: colors.border },
                selected.includes(label) && { borderColor: colors.selectedOutline, borderWidth: 2, backgroundColor: colors.selectedFill },
              ]}
              onPress={() => toggle(label)}
              activeOpacity={0.8}
            >
              {selected.includes(label) && (
                <View style={[styles.checkBadge, { backgroundColor: colors.accent }]}>
                  <MaterialIcons name="check" size={14} color={colors.tint} />
                </View>
              )}
              <MaterialCommunityIcons
                name={icon}
                size={32}
                color={selected.includes(label) ? colors.tint : colors.textSecondary}
                style={styles.optionIcon}
              />
              <ThemedText style={[styles.optionLabel, { color: colors.text }]} numberOfLines={2}>
                {label}
              </ThemedText>
              <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]} numberOfLines={2}>
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
  progressDot: { width: 8, height: 8, borderRadius: 4 },
  progressDotActive: { width: 24, borderRadius: 4 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10, lineHeight: 32 },
  subtitle: { fontSize: 16, lineHeight: 22 },
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
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  checkBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: { marginTop: 8, marginBottom: 10 },
  optionLabel: { fontSize: 14, fontWeight: "700", textAlign: "center", marginBottom: 4 },
  optionDescription: { fontSize: 11, textAlign: "center", lineHeight: 14 },
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
