import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserType = "caregiver" | "facility" | "innovator" | null;

const OPTIONS: Array<{
  id: UserType;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  image: number;
}> = [
  {
    id: "caregiver",
    title: "Families / Individual Caregivers",
    description:
      "Looking for tools for aging parents, dementia care, loneliness, safety, monitoring, etc.",
    icon: "heart-outline",
    image: require("@/assets/images/selector_page/family.jpg"),
  },
  {
    id: "facility",
    title: "Care Facilities / Organizations",
    description:
      "Long-term care, assisted living, retirement homes, home-care agencies.",
    icon: "domain",
    image: require("@/assets/images/selector_page/carefacilities.jpg"),
  },
  {
    id: "innovator",
    title: "AgeTech Innovators / Companies",
    description:
      "Startups and mature companies offering products/services for aging populations.",
    icon: "lightbulb-outline",
    image: require("@/assets/images/selector_page/companies.jpg"),
  },
];

export default function UserTypeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const { setUserType } = useOnboardingSurvey();

  const handleContinue = () => {
    if (!selectedType) return;
    setUserType(selectedType);
    // Families & Care Facilities: same 5-step survey; Innovators: different 5-step survey
    if (selectedType === "caregiver" || selectedType === "facility") {
      router.push("./survey-1" as any);
    } else {
      router.push("./innovator-survey-1" as any);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotActive, { backgroundColor: colors.accent }]} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.progressDot, { backgroundColor: colors.border }]} />
          ))}
        </View>
        <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
          How will you use AgeTech Connect?
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Choose your profile type to customize your experience and start
          matching.
        </ThemedText>
      </View>

      {/* Scrollable Options */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.optionCard,
              { backgroundColor: colors.cardBackground, borderColor: colors.border },
              selectedType === opt.id && { borderColor: colors.selectedOutline, borderWidth: 2, backgroundColor: colors.selectedFill },
            ]}
            onPress={() => setSelectedType(opt.id)}
            activeOpacity={0.8}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.optionIconWrap, { backgroundColor: colors.secondary + "20" }]}>
                <MaterialCommunityIcons
                  name={opt.icon}
                  size={28}
                  color={selectedType === opt.id ? colors.tint : colors.textSecondary}
                />
              </View>
              <View style={styles.optionTextWrap}>
                <ThemedText style={[styles.optionTitle, { color: colors.text }]}>{opt.title}</ThemedText>
                <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]}>
                  {opt.description}
                </ThemedText>
              </View>
            </View>
            <View style={[styles.optionImageWrap, { backgroundColor: colors.border }]}>
              <Image
                source={opt.image}
                style={styles.optionImage}
                contentFit="cover"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <View style={styles.infoBlock}>
          <MaterialIcons
            name="info-outline"
            size={20}
            color={colors.textSecondary}
            style={styles.infoIcon}
          />
          <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
            Don't worry, you can change your account type later in the settings.
            Your selection helps us show you the most relevant innovations.
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: selectedType ? colors.tint : colors.border },
          ]}
          onPress={handleContinue}
          disabled={!selectedType}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
          <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 0,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressDotActive: {
    width: 24,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 14,
    minHeight: 108,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  optionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  optionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextWrap: { flex: 1 },
  optionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  optionImageWrap: {
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 14,
  },
  optionImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 10,
  },
  infoIcon: { marginTop: 2 },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 18,
    gap: 10,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
