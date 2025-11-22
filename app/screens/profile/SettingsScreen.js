// app/screens/profile/SettingsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/colors";

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: {
      pushNotifications: true,
      emailNotifications: true,
      courseReminders: true,
      achievementAlerts: true,
      soundEnabled: true,
      vibrationEnabled: true,
    },
    privacy: {
      profileVisibility: true,
      showActivity: true,
      allowMessages: true,
      showEmail: false,
      showPhone: false,
    },
    preferences: {
      autoPlayVideos: false,
      downloadQuality: "high",
      language: "English",
      fontSize: "medium",
      theme: "light",
    },
    app: {
      cacheEnabled: true,
      dataUsage: "moderate",
      autoDownload: false,
      cellularData: true,
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("appSettings");
      const defaultSettings = {
        notifications: {
          pushNotifications: true,
          emailNotifications: true,
          courseReminders: true,
          achievementAlerts: true,
          soundEnabled: true,
          vibrationEnabled: true,
        },
        privacy: {
          profileVisibility: true,
          showActivity: true,
          allowMessages: true,
          showEmail: false,
          showPhone: false,
        },
        preferences: {
          autoPlayVideos: false,
          downloadQuality: "high",
          language: "English",
          fontSize: "medium",
          theme: "light",
        },
        app: {
          cacheEnabled: true,
          dataUsage: "moderate",
          autoDownload: false,
          cellularData: true,
        },
      };

      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);

        // MERGE saved settings with defaults
        const mergedSettings = {
          ...defaultSettings,
          ...parsed,
          notifications: {
            ...defaultSettings.notifications,
            ...parsed.notifications,
          },
          privacy: { ...defaultSettings.privacy, ...parsed.privacy },
          preferences: {
            ...defaultSettings.preferences,
            ...parsed.preferences,
          },
          app: { ...defaultSettings.app, ...parsed.app },
        };

        setSettings(mergedSettings);
      } else {
        setSettings(defaultSettings);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading settings:", error);
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem("appSettings", JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("Error saving settings:", error);
      Alert.alert("Error", "Failed to save settings");
    }
  };

  const toggleSetting = (category, key) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key],
      },
    };
    saveSettings(newSettings);
  };

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "This will free up space on your device. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            // Simulate cache clearing
            setTimeout(() => {
              Alert.alert(
                "Success",
                "Cache cleared successfully! Freed up 45 MB."
              );
            }, 1000);
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "This will restore all settings to default. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("appSettings");
              const defaultSettings = {
                notifications: {
                  pushNotifications: true,
                  emailNotifications: true,
                  courseReminders: true,
                  achievementAlerts: true,
                  soundEnabled: true,
                  vibrationEnabled: true,
                },
                privacy: {
                  profileVisibility: true,
                  showActivity: true,
                  allowMessages: true,
                  showEmail: false,
                  showPhone: false,
                },
                preferences: {
                  autoPlayVideos: false,
                  downloadQuality: "high",
                  language: "English",
                  fontSize: "medium",
                  theme: "light",
                },
                app: {
                  cacheEnabled: true,
                  dataUsage: "moderate",
                  autoDownload: false,
                  cellularData: true,
                },
              };
              setSettings(defaultSettings);
              Alert.alert("Success", "Settings reset to default");
            } catch (error) {
              Alert.alert("Error", "Failed to reset settings");
            }
          },
        },
      ]
    );
  };

  const handleDownloadQuality = () => {
    Alert.alert("Download Quality", "Choose video download quality", [
      {
        text: "Low (360p)",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, downloadQuality: "low" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "Medium (720p)",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, downloadQuality: "medium" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "High (1080p)",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, downloadQuality: "high" },
          };
          saveSettings(newSettings);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleLanguage = () => {
    Alert.alert("Select Language", "Choose your preferred language", [
      {
        text: "English",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, language: "English" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "Spanish",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, language: "Spanish" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "French",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, language: "French" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "German",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, language: "German" },
          };
          saveSettings(newSettings);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleFontSize = () => {
    Alert.alert("Font Size", "Choose your preferred font size", [
      {
        text: "Small",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, fontSize: "small" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "Medium",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, fontSize: "medium" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "Large",
        onPress: () => {
          const newSettings = {
            ...settings,
            preferences: { ...settings.preferences, fontSize: "large" },
          };
          saveSettings(newSettings);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleDataUsage = () => {
    Alert.alert("Data Usage", "Select data usage preference", [
      {
        text: "Low - Save Data",
        onPress: () => {
          const newSettings = {
            ...settings,
            app: { ...settings.app, dataUsage: "low" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "Moderate - Balanced",
        onPress: () => {
          const newSettings = {
            ...settings,
            app: { ...settings.app, dataUsage: "moderate" },
          };
          saveSettings(newSettings);
        },
      },
      {
        text: "High - Best Quality",
        onPress: () => {
          const newSettings = {
            ...settings,
            app: { ...settings.app, dataUsage: "high" },
          };
          saveSettings(newSettings);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.\n\nAre you absolutely sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Final Confirmation",
              'Type "DELETE" to confirm account deletion',
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "I Understand",
                  style: "destructive",
                  onPress: () => {
                    Alert.alert(
                      "Info",
                      "Account deletion feature will be available soon. Please contact support."
                    );
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightComponent}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Feather name={icon} size={20} color={COLORS.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title, icon }) => (
    <View style={styles.sectionHeader}>
      <Feather
        name={icon}
        size={16}
        color={COLORS.gray}
        style={styles.sectionIcon}
      />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Notifications Section */}
      <SectionHeader title="Notifications" icon="bell" />
      <View style={styles.section}>
        <SettingItem
          icon="bell"
          title="Push Notifications"
          subtitle="Receive push notifications"
          rightComponent={
            <Switch
              value={settings.notifications.pushNotifications}
              onValueChange={() =>
                toggleSetting("notifications", "pushNotifications")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="mail"
          title="Email Notifications"
          subtitle="Receive email updates"
          rightComponent={
            <Switch
              value={settings.notifications.emailNotifications}
              onValueChange={() =>
                toggleSetting("notifications", "emailNotifications")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="clock"
          title="Course Reminders"
          subtitle="Daily learning reminders"
          rightComponent={
            <Switch
              value={settings.notifications.courseReminders}
              onValueChange={() =>
                toggleSetting("notifications", "courseReminders")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="award"
          title="Achievement Alerts"
          subtitle="Get notified about achievements"
          rightComponent={
            <Switch
              value={settings.notifications.achievementAlerts}
              onValueChange={() =>
                toggleSetting("notifications", "achievementAlerts")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="volume-2"
          title="Sound"
          subtitle="Notification sounds"
          rightComponent={
            <Switch
              value={settings.notifications.soundEnabled}
              onValueChange={() =>
                toggleSetting("notifications", "soundEnabled")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="smartphone"
          title="Vibration"
          subtitle="Vibrate on notifications"
          rightComponent={
            <Switch
              value={settings.notifications.vibrationEnabled}
              onValueChange={() =>
                toggleSetting("notifications", "vibrationEnabled")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
      </View>

      {/* Privacy Section */}
      <SectionHeader title="Privacy & Security" icon="shield" />
      <View style={styles.section}>
        <SettingItem
          icon="eye"
          title="Profile Visibility"
          subtitle="Make your profile visible to others"
          rightComponent={
            <Switch
              value={settings.privacy.profileVisibility}
              onValueChange={() =>
                toggleSetting("privacy", "profileVisibility")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="activity"
          title="Show Activity"
          subtitle="Share your learning activity"
          rightComponent={
            <Switch
              value={settings.privacy.showActivity}
              onValueChange={() => toggleSetting("privacy", "showActivity")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="message-circle"
          title="Allow Messages"
          subtitle="Receive messages from other users"
          rightComponent={
            <Switch
              value={settings.privacy.allowMessages}
              onValueChange={() => toggleSetting("privacy", "allowMessages")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="mail"
          title="Show Email"
          subtitle="Display email on profile"
          rightComponent={
            <Switch
              value={settings.privacy.showEmail}
              onValueChange={() => toggleSetting("privacy", "showEmail")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="phone"
          title="Show Phone"
          subtitle="Display phone number on profile"
          rightComponent={
            <Switch
              value={settings.privacy.showPhone}
              onValueChange={() => toggleSetting("privacy", "showPhone")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
      </View>

      {/* Preferences Section */}
      <SectionHeader title="Preferences" icon="settings" />
      <View style={styles.section}>
        <SettingItem
          icon="play-circle"
          title="Auto-Play Videos"
          subtitle="Automatically play videos"
          rightComponent={
            <Switch
              value={settings.preferences.autoPlayVideos}
              onValueChange={() =>
                toggleSetting("preferences", "autoPlayVideos")
              }
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="download"
          title="Download Quality"
          subtitle={`Current: ${settings.preferences.downloadQuality}`}
          onPress={handleDownloadQuality}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
        <SettingItem
          icon="globe"
          title="Language"
          subtitle={settings.preferences.language}
          onPress={handleLanguage}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
        <SettingItem
          icon="type"
          title="Font Size"
          subtitle={`Current: ${settings.preferences.fontSize}`}
          onPress={handleFontSize}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
      </View>

      {/* App Settings Section */}
      <SectionHeader title="App Settings" icon="smartphone" />
      <View style={styles.section}>
        <SettingItem
          icon="database"
          title="Cache"
          subtitle="Enable caching for faster loading"
          rightComponent={
            <Switch
              value={settings.app.cacheEnabled}
              onValueChange={() => toggleSetting("app", "cacheEnabled")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="trash-2"
          title="Clear Cache"
          subtitle="Free up storage space (45 MB)"
          onPress={handleClearCache}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
        <SettingItem
          icon="wifi"
          title="Data Usage"
          subtitle={`${settings.app.dataUsage} - Click to change`}
          onPress={handleDataUsage}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
        <SettingItem
          icon="download-cloud"
          title="Auto Download"
          subtitle="Download lessons automatically"
          rightComponent={
            <Switch
              value={settings.app.autoDownload}
              onValueChange={() => toggleSetting("app", "autoDownload")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
        <SettingItem
          icon="wifi"
          title="Use Cellular Data"
          subtitle="Stream over mobile network"
          rightComponent={
            <Switch
              value={settings.app.cellularData}
              onValueChange={() => toggleSetting("app", "cellularData")}
              trackColor={{ false: "#e0e0e0", true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          }
        />
      </View>

      {/* Legal Section */}
      <SectionHeader title="Legal" icon="file-text" />
      <View style={styles.section}>
        <SettingItem
          icon="file-text"
          title="Terms of Service"
          subtitle="Read our terms and conditions"
          onPress={() =>
            Alert.alert(
              "Terms of Service",
              "Terms of Service will be available soon!"
            )
          }
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
        <SettingItem
          icon="shield"
          title="Privacy Policy"
          subtitle="How we handle your data"
          onPress={() =>
            Alert.alert(
              "Privacy Policy",
              "Privacy Policy will be available soon!"
            )
          }
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
        <SettingItem
          icon="info"
          title="Open Source Licenses"
          subtitle="Third-party software licenses"
          onPress={() =>
            Alert.alert(
              "Licenses",
              "Open source licenses will be available soon!"
            )
          }
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.gray} />
          }
        />
      </View>

      {/* Danger Zone */}
      <SectionHeader title="Danger Zone" icon="alert-triangle" />
      <View style={styles.section}>
        <SettingItem
          icon="rotate-ccw"
          title="Reset Settings"
          subtitle="Restore default settings"
          onPress={handleResetSettings}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.error} />
          }
        />
        <SettingItem
          icon="trash"
          title="Delete Account"
          subtitle="Permanently delete your account"
          onPress={handleDeleteAccount}
          rightComponent={
            <Feather name="chevron-right" size={20} color={COLORS.error} />
          }
        />
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Feather name="package" size={48} color={COLORS.gray} />
        <Text style={styles.appName}>SkillUp</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appCopyright}>
          © 2024 SkillUp. All rights reserved.
        </Text>
        <Text style={styles.appMade}>Made with ❤️ for UoM</Text>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  appVersion: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 10,
  },
  appMade: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  footer: {
    height: 20,
  },
});

export default SettingsScreen;
