/**
 * D. Care Setting (Contextual Filter)
 * Where will this technology be used? (Multi-select)
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
      { label: "Community / day programs", icon: "groups" },
    ],
  },
];

const TOTAL_STEPS = 5;
const STEP = 4;

export default function Survey4Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setCareSetting } = useOnboardingSurvey();
  const [selected, setSelected] = useState<string[]>(state.careSetting);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleContinue = () => {
    setCareSetting(selected);
    router.push("./survey-5" as any);
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
          Where will this technology be used?
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select all that apply to help us find the best tech matches for your
          environment.
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
              <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
              <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</ThemedText>
              <View style={[styles.sectionLine, { backgroundColor: colors.border }]} />
            </View>
            <View style={styles.sectionGrid}>
              {section.options.map(({ label, icon }) => {
                const isSelected = selected.includes(label);
                return (
                  <TouchableOpacity
                    key={label}
                    style={[
                      styles.optionCard,
                      { backgroundColor: colors.cardBackground, borderColor: colors.border },
                      isSelected && { borderColor: colors.selectedOutline, borderWidth: 2, backgroundColor: colors.selectedFill },
                    ]}
                    onPress={() => toggle(label)}
                    activeOpacity={0.8}
                  >
                    {isSelected && (
                      <View style={[styles.checkBadge, { backgroundColor: colors.accent }]}>
                        <MaterialIcons name="check" size={14} color={colors.tint} />
                      </View>
                    )}
                    <View style={[styles.cardIconWrap, { backgroundColor: colors.secondary + "20" }]}>
                      <MaterialIcons
                        name={icon}
                        size={28}
                        color={isSelected ? colors.tint : colors.secondary}
                      />
                    </View>
                    <ThemedText
                      style={[
                        styles.optionLabel,
                        { color: colors.text },
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
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sectionLine: { flex: 1, height: 1, opacity: 0.6 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
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
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 14,
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
  cardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  optionLabel: { fontSize: 15, fontWeight: "700", textAlign: "center" },
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
