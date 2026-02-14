import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
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

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
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
                color={colors.text}
              />
            </TouchableOpacity>
            <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
              Log In
            </ThemedText>
            <View style={styles.backButton} />
          </View>

          {/* Greeting: icon + Welcome Back + subtitle */}
          <View style={styles.greetingSection}>
            <View style={[styles.iconCircle, { backgroundColor: colors.secondary + "20" }]}>
              <MaterialCommunityIcons
                name="account-group"
                size={48}
                color={colors.secondary}
              />
            </View>
            <ThemedText type="title" style={[styles.greetingTitle, { color: colors.text }]}>
              Welcome Back
            </ThemedText>
            <ThemedText style={[styles.greetingSubtitle, { color: colors.textSecondary }]}>
              Enter your details to access your account.
            </ThemedText>
          </View>

          {/* Social login */}
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="google"
              size={22}
              color={colors.text}
            />
            <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>
              Continue with Google
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.appleButton, { backgroundColor: colors.backgroundSecondary }]} activeOpacity={0.8}>
            <MaterialCommunityIcons name="apple" size={22} color={colors.text} />
            <ThemedText style={[styles.appleButtonText, { color: colors.text }]}>
              Continue with Apple
            </ThemedText>
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles.separatorRow}>
            <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
            <ThemedText style={[styles.separatorText, { color: colors.textSecondary }]}>
              OR LOG IN WITH EMAIL
            </ThemedText>
            <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Email field */}
          <View style={[styles.inputWrapper, { backgroundColor: colors.inputBackground, borderColor: errors.email ? colors.error : colors.border }]}>
            <MaterialIcons
              name="mail-outline"
              size={22}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Email Address"
              placeholderTextColor={colors.textSecondary}
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
          <View style={[styles.inputWrapper, { backgroundColor: colors.inputBackground, borderColor: errors.password ? colors.error : colors.border }]}>
            <MaterialIcons
              name="lock-outline"
              size={22}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                styles.inputRightPadding,
                { color: colors.text },
                errors.password && { borderColor: colors.error },
              ]}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
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
                color={colors.textSecondary}
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
            <ThemedText style={[styles.forgotPasswordLink, { color: colors.secondary }]}>
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>

          {/* Primary CTA */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.tint }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.primaryButtonText}>Log In</ThemedText>
          </TouchableOpacity>

          {/* Sign up prompt */}
          <View style={styles.footerPrompt}>
            <ThemedText style={[styles.footerText, { color: colors.textSecondary }]}>
              Don't have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("./signup" as any)}>
              <ThemedText style={[styles.footerLink, { color: colors.secondary }]}>Sign Up</ThemedText>
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
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
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
  },
  greetingSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    columnGap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    columnGap: 12,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: "600",
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
  },
  separatorText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
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
  },
  primaryButton: {
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
  },
  footerLink: {
    fontSize: 15,
    fontWeight: "600",
  },
});
