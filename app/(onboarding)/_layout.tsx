import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="user-type" />
      <Stack.Screen name="survey-1" />
      <Stack.Screen name="survey-2" />
    </Stack>
  );
}
