import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MenuItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

function MenuItem({ title, subtitle, onPress, isDestructive = false }: MenuItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.menuItem, { borderBottomColor: colors.border }]}>
        <View style={styles.menuItemContent}>
          <ThemedText
            style={[
              styles.menuItemTitle,
              {
                color: isDestructive ? colors.error : colors.text,
              },
            ]}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </ThemedText>
          )}
        </View>
        <ThemedText style={[styles.chevron, { color: colors.textSecondary }]}>
          ›
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { colorScheme: themePreference, setColorScheme } = useTheme();

  const handleEditPreferences = () => {
    // Navigate to preferences screen
    // router.push('/(tabs)/preferences');
  };

  const handleAccountSettings = () => {
    // Navigate to account settings screen
    // router.push('/(tabs)/account-settings');
  };

  const handleLogOut = () => {
    // Handle logout
    router.replace('../auth/welcome' as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Profile
          </ThemedText>
        </View>

        {/* Profile Info Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <ThemedText style={styles.avatarText}>JD</ThemedText>
            </View>
            <View style={styles.profileDetails}>
              <ThemedText type="title" style={styles.profileName}>
                John Doe
              </ThemedText>
              <ThemedText style={[styles.profileRole, { color: colors.textSecondary }]}>
                Caregiver
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Theme toggle */}
        <Card style={styles.menuCard}>
          <View style={[styles.themeRow, { borderBottomColor: colors.border }]}>
            <View style={styles.themeRowContent}>
              <ThemedText style={[styles.menuItemTitle, { color: colors.text }]}>
                Dark mode
              </ThemedText>
              <ThemedText style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                {themePreference === null ? 'Using system' : themePreference === 'dark' ? 'On' : 'Off'}
              </ThemedText>
            </View>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
              trackColor={{ false: colors.border, true: colors.tint + '80' }}
              thumbColor={colorScheme === 'dark' ? colors.tint : colors.textSecondary}
            />
          </View>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <MenuItem
            title="Edit Preferences"
            subtitle="Update your matching preferences"
            onPress={handleEditPreferences}
          />
          <MenuItem
            title="Account Settings"
            subtitle="Manage your account information"
            onPress={handleAccountSettings}
          />
        </Card>

        {/* Log Out */}
        <Card style={styles.menuCard}>
          <MenuItem
            title="Log Out"
            onPress={handleLogOut}
            isDestructive
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  profileCard: {
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
  },
  menuCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 0,
  },
  themeRowContent: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 12,
  },
});
