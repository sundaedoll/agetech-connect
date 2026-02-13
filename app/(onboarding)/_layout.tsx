import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "card",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="user-type" />
      <Stack.Screen name="survey-1" />
      <Stack.Screen name="survey-2" />
      <Stack.Screen name="survey-3" />
      <Stack.Screen name="survey-4" />
      <Stack.Screen name="survey-5" />
      <Stack.Screen name="innovator-survey-1" />
      <Stack.Screen name="innovator-survey-2" />
      <Stack.Screen name="innovator-survey-3" />
      <Stack.Screen name="innovator-survey-4" />
      <Stack.Screen name="innovator-survey-5" />
      <Stack.Screen name="innovator-profile-1" />
      <Stack.Screen name="innovator-profile-2" />
      <Stack.Screen name="innovator-profile-3" />
    </Stack>
  );
}
