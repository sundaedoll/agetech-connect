import { ThemedText } from "@/components/themed-text";
import { TrustTeal } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
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

// Onboarding colors - background #1a1f2e
const BG = "#1a1f2e";
const CARD_BG = "#364652";
const CARD_BG_SELECTED = "rgba(0,128,128,0.12)";
const BORDER = "#3d4f5f";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#9CA3AF";
const ICON_TINT = "#5b9aa0";

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
    image: require("@/assets/images/icon.png"),
  },
  {
    id: "facility",
    title: "Care Facilities / Organizations",
    description:
      "Long-term care, assisted living, retirement homes, home-care agencies.",
    icon: "domain",
    image: require("@/assets/images/splash-icon.png"),
  },
  {
    id: "innovator",
    title: "AgeTech Innovators / Companies",
    description:
      "Startups and mature companies offering products/services for aging populations.",
    icon: "lightbulb-outline",
    image: require("@/assets/images/react-logo.png"),
  },
];

export default function UserTypeScreen() {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const { setUserType } = useOnboardingSurvey();

  const handleContinue = () => {
    if (!selectedType) return;
    setUserType(selectedType);
    // Families & Care Facilities go through the 5-step survey; Innovators skip to app
    if (selectedType === "caregiver" || selectedType === "facility") {
      router.push("./survey-1" as any);
    } else {
      router.replace("../(tabs)" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.progressDot} />
          ))}
        </View>
        <ThemedText type="title" style={styles.title}>
          How will you use AgeTech Connect?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
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
              selectedType === opt.id && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedType(opt.id)}
            activeOpacity={0.8}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIconWrap}>
                <MaterialCommunityIcons
                  name={opt.icon}
                  size={28}
                  color={selectedType === opt.id ? TrustTeal : ICON_TINT}
                />
              </View>
              <View style={styles.optionTextWrap}>
                <ThemedText style={styles.optionTitle}>{opt.title}</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  {opt.description}
                </ThemedText>
              </View>
            </View>
            <View style={styles.optionImageWrap}>
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
            color={ICON_TINT}
            style={styles.infoIcon}
          />
          <ThemedText style={styles.infoText}>
            Don't worry, you can change your account type later in the settings.
            Your selection helps us show you the most relevant innovations.
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedType && styles.continueButtonDisabled,
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
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
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
    backgroundColor: BORDER,
  },
  progressDotActive: {
    width: 24,
    borderRadius: 4,
    backgroundColor: TrustTeal,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CARD_BG,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: BORDER,
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
  optionCardSelected: {
    borderColor: TrustTeal,
    borderWidth: 2,
    backgroundColor: CARD_BG_SELECTED,
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
    backgroundColor: "rgba(0,128,128,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextWrap: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 20,
  },
  optionImageWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 14,
    backgroundColor: BORDER,
  },
  optionImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 0,
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 10,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 20,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TrustTeal,
    borderRadius: 14,
    paddingVertical: 18,
    gap: 10,
  },
  continueButtonDisabled: {
    backgroundColor: BORDER,
    opacity: 0.8,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
