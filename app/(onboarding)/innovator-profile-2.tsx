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

  const canContinue = true; // All fields optional for now

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
        <View style={styles.header}>
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
          <ThemedText style={[styles.title, { color: colors.text }]}>Solution Overview</ThemedText>
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
          {/* Product card with accent strip */}
          <View style={[styles.productCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={[styles.productAccent, { backgroundColor: colors.tint }]} />
            <View style={styles.productCardInner}>
              <View style={[styles.productIconWrap, { backgroundColor: colors.tint + "20" }]}>
                <MaterialCommunityIcons name="lightbulb-on" size={32} color={colors.tint} />
              </View>
              <TextInput
                style={[styles.productNameInput, { color: colors.text }]}
                placeholder="Product / solution name *"
                placeholderTextColor={colors.textSecondary}
                value={productName}
                onChangeText={setProductName}
              />
              <TextInput
                style={[styles.descriptionInput, { color: colors.text, backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}
                placeholder="Plain-language description of what it does and who it helps *"
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Stage selector */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="rocket-launch-outline" size={22} color={colors.tint} />
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Technology stage <ThemedText style={styles.required}>*</ThemedText>
            </ThemedText>
          </View>
          <View style={styles.stageRow}>
            {STAGES.map((s) => {
              const sel = technologyStage === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.stageChip,
                    { borderColor: colors.border, backgroundColor: colors.cardBackground },
                    sel && { backgroundColor: colors.tint, borderColor: colors.tint },
                  ]}
                  onPress={() => setTechnologyStage(s)}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[styles.stageChipText, { color: sel ? "#FFFFFF" : colors.textSecondary }]}>
                    {s}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Benefits (3–5 bullets) */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="format-list-checks" size={22} color={colors.tint} />
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Main benefits / impact (2–5) <ThemedText style={styles.required}>*</ThemedText>
            </ThemedText>
            <View style={[styles.benefitCount, { backgroundColor: colors.tint + "30" }]}>
              <ThemedText style={[styles.benefitCountText, { color: colors.tint }]}>{benefits.length}/5</ThemedText>
            </View>
          </View>
          {benefits.map((b, i) => (
            <View key={i} style={[styles.benefitRow, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <View style={[styles.benefitNum, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.benefitNumText}>{i + 1}</ThemedText>
              </View>
              <ThemedText style={[styles.benefitText, { color: colors.text }]} numberOfLines={2}>
                {b}
              </ThemedText>
              <TouchableOpacity onPress={() => removeBenefit(i)} style={styles.removeBtn} hitSlop={12}>
                <MaterialIcons name="close" size={20} color={colors.textSecondary} />
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
                style={[styles.addBtn, { backgroundColor: benefitInput.trim() ? colors.tint : colors.border }]}
                onPress={addBenefit}
                disabled={!benefitInput.trim()}
                activeOpacity={0.8}
              >
                <MaterialIcons name="add" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          {/* Categories chips */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="tag-multiple-outline" size={22} color={colors.tint} />
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Categories (select all that apply) <ThemedText style={styles.required}>*</ThemedText>
            </ThemedText>
          </View>
          <View style={styles.chipWrap}>
            {CATEGORIES.map((c) => {
              const sel = categories.includes(c);
              return (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.categoryChip,
                    { borderColor: colors.border, backgroundColor: colors.cardBackground },
                    sel && { backgroundColor: colors.tint + "30", borderColor: colors.tint },
                  ]}
                  onPress={() => toggleCategory(c)}
                  activeOpacity={0.8}
                >
                  {sel && <MaterialCommunityIcons name="check" size={16} color={colors.tint} style={styles.chipCheck} />}
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
            <MaterialCommunityIcons name="arrow-right-circle" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  stepIndicator: { flexDirection: "row", gap: 8, marginBottom: 12 },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, lineHeight: 20, color: "#454545" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48 },
  productCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 32,
  },
  productAccent: { height: 5, width: "100%" },
  productCardInner: { padding: 22 },
  productIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  productNameInput: { fontSize: 20, fontWeight: "700", marginBottom: 14, padding: 0 },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    minHeight: 110,
    textAlignVertical: "top",
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "700", flex: 1 },
  required: { color: "#EF4444" },
  benefitCount: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  benefitCountText: { fontSize: 13, fontWeight: "700" },
  stageRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 28 },
  stageChip: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  stageChipText: { fontSize: 14, fontWeight: "700" },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  benefitNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  benefitNumText: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
  benefitText: { flex: 1, fontSize: 16, lineHeight: 22 },
  removeBtn: { padding: 4 },
  benefitAddRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  benefitInput: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
  },
  addBtn: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 32 },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipCheck: { marginRight: 6 },
  categoryChipText: { fontSize: 15, fontWeight: "600" },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 18,
    gap: 12,
  },
  primaryBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
});
