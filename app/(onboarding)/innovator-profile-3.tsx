/**
 * Innovator Profile: 3. Credibility & Trust
 * Unique design: Trust badges with optional section clearly distinguished
 */
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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

const CERTIFICATIONS = ["HIPAA", "SOC2", "PIPEDA", "PIA", "ISO 27001", "Other"];

const STEPS = 3;
const STEP = 3;

export default function InnovatorProfile3Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setInnovatorProfile } = useOnboardingSurvey();
  const profile = state.innovatorProfile ?? {
    certifications: [],
    yearsInOperation: "",
    pilotPartners: "",
    testimonials: "",
  };

  const [certifications, setCertifications] = useState<string[]>(profile.certifications ?? []);
  const [yearsInOperation, setYearsInOperation] = useState(profile.yearsInOperation ?? "");
  const [pilotPartners, setPilotPartners] = useState(profile.pilotPartners ?? "");
  const [testimonials, setTestimonials] = useState(profile.testimonials ?? "");

  const toggleCert = (c: string) => {
    setCertifications((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const canFinish = certifications.length >= 1;

  const handleFinish = () => {
    setInnovatorProfile({
      certifications,
      yearsInOperation: yearsInOperation.trim(),
      pilotPartners: pilotPartners.trim(),
      testimonials: testimonials.trim(),
    });
    router.replace("../(tabs)" as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={[styles.header, { paddingTop: 80 }]}>
          <View style={styles.stepIndicator}>
            {Array.from({ length: STEPS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.stepDot,
                  { backgroundColor: colors.border },
                  i < STEPS && { backgroundColor: colors.tint },
                ]}
              />
            ))}
          </View>
          <View style={[styles.trustBadge, { backgroundColor: colors.backgroundSecondary, borderColor: colors.tint }]}>
            <MaterialCommunityIcons name="shield-check" size={32} color={colors.tint} />
            <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
              Credibility & Trust
            </ThemedText>
          </View>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Help families trust your solution with certifications and proof.
          </ThemedText>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Certifications - mandatory */}
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Certifications / compliance <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <ThemedText style={[styles.sectionHint, { color: colors.textSecondary }]}>
            Select all that apply (e.g. HIPAA, SOC2, PIPEDA, PIA)
          </ThemedText>
          <View style={styles.certWrap}>
            {CERTIFICATIONS.map((c) => {
              const sel = certifications.includes(c);
              return (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.certChip,
                    { borderColor: colors.border, backgroundColor: colors.cardBackground },
                    sel && { backgroundColor: colors.tint + "25", borderColor: colors.tint },
                  ]}
                  onPress={() => toggleCert(c)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, { borderColor: colors.border }, sel && { backgroundColor: colors.tint, borderColor: colors.tint }]}>
                    {sel && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
                  </View>
                  <ThemedText style={[styles.certChipText, { color: sel ? colors.tint : colors.text }]}>
                    {c}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Optional section */}
          <View style={[styles.optionalSection, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
            <View style={styles.optionalHeader}>
              <ThemedText style={[styles.optionalLabel, { color: colors.textSecondary }]}>
                Optional but recommended
              </ThemedText>
              <MaterialCommunityIcons name="information-outline" size={18} color={colors.textSecondary} />
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Years in operation
              </ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.text }]}
                placeholder="e.g. 3"
                placeholderTextColor={colors.textSecondary}
                value={yearsInOperation}
                onChangeText={setYearsInOperation}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Pilot partners / research institutions / affiliations
              </ThemedText>
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.text }]}
                placeholder="List current or past partners..."
                placeholderTextColor={colors.textSecondary}
                value={pilotPartners}
                onChangeText={setPilotPartners}
                multiline
                numberOfLines={3}
              />
            </View>
            <View style={styles.fieldGroup}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                Testimonials or case study links
              </ThemedText>
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.text }]}
                placeholder="URLs or short quotes..."
                placeholderTextColor={colors.textSecondary}
                value={testimonials}
                onChangeText={setTestimonials}
                multiline
                numberOfLines={2}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: canFinish ? colors.tint : colors.border }]}
            onPress={handleFinish}
            disabled={!canFinish}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
            <ThemedText style={styles.primaryBtnText}>Finish Setup</ThemedText>
          </TouchableOpacity>

          <ThemedText style={[styles.footerText, { color: colors.textSecondary }]}>
            By finishing, you agree to our Terms of Service and Privacy Policy.
          </ThemedText>
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
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: "700", flex: 1 },
  subtitle: { fontSize: 16, lineHeight: 22, marginBottom: 24 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  sectionHint: { fontSize: 14, marginBottom: 16 },
  required: { color: "#EF4444" },
  certWrap: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 32 },
  certChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  certChipText: { fontSize: 15, fontWeight: "600" },
  optionalSection: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 28,
  },
  optionalHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  optionalLabel: { fontSize: 13, fontWeight: "600", letterSpacing: 0.5 },
  fieldGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  textArea: { minHeight: 80, textAlignVertical: "top" },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 14,
    gap: 10,
    marginBottom: 16,
  },
  primaryBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
  footerText: { fontSize: 13, textAlign: "center", lineHeight: 20 },
});
