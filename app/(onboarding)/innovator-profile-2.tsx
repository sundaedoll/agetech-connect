/**
 * Innovator Profile: 2. Solution Overview
 * Unique design: Product card with benefit bullets and category chips
 */
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useOnboardingSurvey } from "@/contexts/onboarding-survey";
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

const CATEGORIES = [
  "Assistive tech",
  "Mobility & fall prevention",
  "Monitoring & safety",
  "Cognitive / dementia",
  "Social connection",
  "Remote monitoring",
  "Finance / planning",
  "Long-term care",
];

const STAGES = ["Pilot / pre-commercial", "Early commercial", "Mature / scaled solution"];

const STEPS = 3;
const STEP = 2;

export default function InnovatorProfile2Screen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { state, setInnovatorProfile } = useOnboardingSurvey();
  const surveyStage = state.technologyStage ?? "";
  const profile = state.innovatorProfile ?? {
    benefits: [],
    categories: [],
    technologyStage: surveyStage,
    productName: "",
    description: "",
  };

  const [productName, setProductName] = useState(profile.productName ?? "");
  const [description, setDescription] = useState(profile.description ?? "");
  const [technologyStage, setTechnologyStage] = useState(profile.technologyStage || surveyStage || "");
  const [benefits, setBenefits] = useState<string[]>(profile.benefits ?? []);
  const [benefitInput, setBenefitInput] = useState("");
  const [categories, setCategories] = useState<string[]>(profile.categories ?? []);

  const toggleCategory = (c: string) => {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const addBenefit = () => {
    if (benefitInput.trim() && benefits.length < 5) {
      setBenefits((prev) => [...prev, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const removeBenefit = (i: number) => {
    setBenefits((prev) => prev.filter((_, idx) => idx !== i));
  };

  const canContinue =
    productName.trim() &&
    description.trim() &&
    technologyStage &&
    benefits.length >= 3 &&
    categories.length >= 1;

  const handleContinue = () => {
    setInnovatorProfile({
      productName: productName.trim(),
      description: description.trim(),
      technologyStage,
      benefits,
      categories,
    });
    router.push("./innovator-profile-3" as any);
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
                  (i + 1 === STEP || i < STEP) && { backgroundColor: colors.tint },
                ]}
              />
            ))}
          </View>
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Solution Overview
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Describe your product and its impact.
          </ThemedText>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product card visual */}
          <View style={[styles.productCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.productHeader}>
              <MaterialCommunityIcons name="lightbulb-on" size={28} color={colors.tint} />
              <TextInput
                style={[styles.productNameInput, { color: colors.text }]}
                placeholder="Product / solution name *"
                placeholderTextColor={colors.textSecondary}
                value={productName}
                onChangeText={setProductName}
              />
            </View>
            <TextInput
              style={[styles.descriptionInput, { color: colors.text, borderColor: colors.border }]}
              placeholder="Plain-language description of what it does and who it helps *"
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Stage selector */}
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Technology stage <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <View style={styles.stageRow}>
            {STAGES.map((s) => {
              const sel = technologyStage === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.stageChip,
                    { borderColor: colors.border },
                    sel && { backgroundColor: colors.tint + "25", borderColor: colors.tint },
                  ]}
                  onPress={() => setTechnologyStage(s)}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[styles.stageChipText, { color: sel ? colors.tint : colors.textSecondary }]}>
                    {s}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Benefits (3–5 bullets) */}
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Main benefits / impact (3–5) <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          {benefits.map((b, i) => (
            <View key={i} style={[styles.benefitRow, { backgroundColor: colors.backgroundSecondary }]}>
              <MaterialCommunityIcons name="check-circle" size={20} color={colors.tint} />
              <ThemedText style={[styles.benefitText, { color: colors.text }]} numberOfLines={1}>
                {b}
              </ThemedText>
              <TouchableOpacity onPress={() => removeBenefit(i)} hitSlop={12}>
                <MaterialIcons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ))}
          {benefits.length < 5 && (
            <View style={styles.benefitAddRow}>
              <TextInput
                style={[
                  styles.benefitInput,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="Add a benefit..."
                placeholderTextColor={colors.textSecondary}
                value={benefitInput}
                onChangeText={setBenefitInput}
                onSubmitEditing={addBenefit}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: colors.tint }]}
                onPress={addBenefit}
                disabled={!benefitInput.trim()}
              >
                <MaterialIcons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          {/* Categories chips */}
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Categories (select all that apply) <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <View style={styles.chipWrap}>
            {CATEGORIES.map((c) => {
              const sel = categories.includes(c);
              return (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.categoryChip,
                    { borderColor: colors.border },
                    sel && { backgroundColor: colors.tint + "25", borderColor: colors.tint },
                  ]}
                  onPress={() => toggleCategory(c)}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[styles.categoryChipText, { color: sel ? colors.tint : colors.textSecondary }]}>
                    {c}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
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
  subtitle: { fontSize: 16, lineHeight: 22, marginBottom: 24 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  productCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  productHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  productNameInput: { flex: 1, fontSize: 18, fontWeight: "700" },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: "top",
  },
  sectionTitle: { fontSize: 15, fontWeight: "600", marginBottom: 12 },
  required: { color: "#EF4444" },
  stageRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  stageChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  stageChipText: { fontSize: 14, fontWeight: "600" },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  benefitText: { flex: 1, fontSize: 15 },
  benefitAddRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  benefitInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  addBtn: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 28 },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  categoryChipText: { fontSize: 14, fontWeight: "600" },
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
