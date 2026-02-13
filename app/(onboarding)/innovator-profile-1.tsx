/**
 * Innovator Profile: 1. Company / Innovator Basics
 * Unique design: Centered logo upload with radiating form fields
 */
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STEPS = 3;
const STEP = 1;

export default function InnovatorProfile1Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setInnovatorProfile } = useOnboardingSurvey();
  const profile = state.innovatorProfile ?? {
    companyName: "",
    tagline: "",
    logoUri: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
  };

  const [companyName, setCompanyName] = useState(profile.companyName ?? "");
  const [tagline, setTagline] = useState(profile.tagline ?? "");
  const [website, setWebsite] = useState(profile.website ?? "");
  const [contactEmail, setContactEmail] = useState(profile.contactEmail ?? "");
  const [contactPhone, setContactPhone] = useState(profile.contactPhone ?? "");

  const canContinue =
    companyName.trim() && tagline.trim() && website.trim() && contactEmail.trim() && contactPhone.trim();

  const handleContinue = () => {
    setInnovatorProfile({
      companyName: companyName.trim(),
      tagline: tagline.trim(),
      website: website.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
    });
    router.push("./innovator-profile-2" as any);
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: colors.cardBackground,
      borderColor: colors.border,
      color: colors.text,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: 80 }]}>
          <View style={styles.stepIndicator}>
            {Array.from({ length: STEPS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.stepDot,
                  { backgroundColor: colors.border },
                  i + 1 === STEP && { backgroundColor: colors.tint },
                  i < STEP && { backgroundColor: colors.tint },
                ]}
              />
            ))}
          </View>
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Company & Contact
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Families will see this. Add your company basics.
          </ThemedText>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo upload area - prominent */}
          <TouchableOpacity
            style={[styles.logoWrap, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="camera-plus-outline" size={48} color={colors.tint} />
            <ThemedText style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Add logo
            </ThemedText>
            <ThemedText style={[styles.logoHint, { color: colors.textSecondary }]}>
              PNG or JPG, square
            </ThemedText>
          </TouchableOpacity>

          {/* Form fields in clean cards */}
          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Company name <ThemedText style={styles.required}>*</ThemedText>
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="e.g. CareTech Innovators"
                placeholderTextColor={colors.textSecondary}
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Tagline <ThemedText style={styles.required}>*</ThemedText>
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="One line that describes your mission"
                placeholderTextColor={colors.textSecondary}
                value={tagline}
                onChangeText={setTagline}
              />
            </View>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Website <ThemedText style={styles.required}>*</ThemedText>
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="https://yourcompany.com"
                placeholderTextColor={colors.textSecondary}
                value={website}
                onChangeText={setWebsite}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Contact email <ThemedText style={styles.required}>*</ThemedText>
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="contact@company.com"
                placeholderTextColor={colors.textSecondary}
                value={contactEmail}
                onChangeText={setContactEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Contact phone <ThemedText style={styles.required}>*</ThemedText>
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="+1 234 567 8900"
                placeholderTextColor={colors.textSecondary}
                value={contactPhone}
                onChangeText={setContactPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: canContinue ? colors.tint : colors.border }]}
            onPress={handleContinue}
            disabled={!canContinue}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.primaryBtnText}>Continue</ThemedText>
            <MaterialCommunityIcons name="arrow-right" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 24 },
  stepIndicator: { flexDirection: "row", gap: 8, marginBottom: 20 },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  logoWrap: {
    width: 140,
    height: 140,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  logoLabel: { fontSize: 15, fontWeight: "600", marginTop: 8 },
  logoHint: { fontSize: 12, marginTop: 4 },
  formCard: {
    backgroundColor: "transparent",
    gap: 20,
    marginBottom: 28,
  },
  fieldGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: "600" },
  required: { color: "#EF4444" },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 14,
    gap: 10,
  },
  primaryBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
});
