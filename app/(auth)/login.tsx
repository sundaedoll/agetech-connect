import { ThemedText } from "@/components/themed-text";
import { TrustTeal } from "@/constants/theme";
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

// Auth screen colors - same as signup (Tech Blue / dark charcoal)
const AUTH_BG = "#1a1f2e";
const CARD_BG = "#252d3b";
const BORDER = "#3d4f5f";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#9CA3AF";
const INPUT_BG = "#252d3b";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      router.replace("../(onboarding)/user-type" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header: Back + Title */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <MaterialIcons
                name="chevron-left"
                size={28}
                color={TEXT_PRIMARY}
              />
            </TouchableOpacity>
            <ThemedText type="title" style={styles.headerTitle}>
              Log In
            </ThemedText>
            <View style={styles.backButton} />
          </View>

          {/* Greeting: icon (Trust Teal circle) + Welcome Back + subtitle */}
          <View style={styles.greetingSection}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="account-group"
                size={48}
                color={TEXT_PRIMARY}
              />
            </View>
            <ThemedText type="title" style={styles.greetingTitle}>
              Welcome Back
            </ThemedText>
            <ThemedText style={styles.greetingSubtitle}>
              Enter your details to access your account.
            </ThemedText>
          </View>

          {/* Social login */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="google"
              size={22}
              color={TEXT_PRIMARY}
            />
            <ThemedText style={styles.socialButtonText}>
              Continue with Google
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appleButton} activeOpacity={0.8}>
            <MaterialCommunityIcons name="apple" size={22} color="#000000" />
            <ThemedText style={styles.appleButtonText}>
              Continue with Apple
            </ThemedText>
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <ThemedText style={styles.separatorText}>
              OR LOG IN WITH EMAIL
            </ThemedText>
            <View style={styles.separatorLine} />
          </View>

          {/* Email field */}
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="mail-outline"
              size={22}
              color={TEXT_SECONDARY}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email Address"
              placeholderTextColor={TEXT_SECONDARY}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors.email ? (
            <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
          ) : null}

          {/* Password field */}
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock-outline"
              size={22}
              color={TEXT_SECONDARY}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                styles.inputRightPadding,
                errors.password && styles.inputError,
              ]}
              placeholder="Password"
              placeholderTextColor={TEXT_SECONDARY}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={22}
                color={TEXT_SECONDARY}
              />
            </TouchableOpacity>
          </View>
          {errors.password ? (
            <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
          ) : null}

          {/* Forgot Password - right aligned */}
          <TouchableOpacity
            style={styles.forgotPasswordWrap}
            onPress={() => {
              // TODO: Navigate to forgot password screen
            }}
          >
            <ThemedText style={styles.forgotPasswordLink}>
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>

          {/* Primary CTA */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.primaryButtonText}>Log In</ThemedText>
          </TouchableOpacity>

          {/* Sign up prompt */}
          <View style={styles.footerPrompt}>
            <ThemedText style={styles.footerText}>
              Don't have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("./signup" as any)}>
              <ThemedText style={styles.footerLink}>Sign Up</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AUTH_BG,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_PRIMARY,
  },
  greetingSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: TrustTeal,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CARD_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    columnGap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_PRIMARY,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    columnGap: 12,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  separatorText: {
    fontSize: 12,
    fontWeight: "600",
    color: TEXT_SECONDARY,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: INPUT_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 4,
    paddingLeft: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 0,
    fontSize: 16,
    color: TEXT_PRIMARY,
    minHeight: 54,
  },
  inputRightPadding: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    padding: 4,
  },
  errorText: {
    fontSize: 13,
    color: "#EF4444",
    marginBottom: 12,
  },
  forgotPasswordWrap: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPasswordLink: {
    fontSize: 15,
    fontWeight: "600",
    color: TrustTeal,
  },
  primaryButton: {
    backgroundColor: TrustTeal,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  footerPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    color: TEXT_SECONDARY,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: "600",
    color: TrustTeal,
  },
});
