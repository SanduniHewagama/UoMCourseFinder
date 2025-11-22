import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/colors";
import { logout } from "../../store/slices/authSlice";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 12,
    favorites: 8,
    hours: 156,
  });

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("appSettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setDarkMode(settings.darkMode || false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading settings:", error);
      setLoading(false);
    }
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return names[0][0];
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Toggle dark mode
  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    try {
      const settings = await AsyncStorage.getItem("appSettings");
      const currentSettings = settings ? JSON.parse(settings) : {};
      await AsyncStorage.setItem(
        "appSettings",
        JSON.stringify({ ...currentSettings, darkMode: newDarkMode })
      );
      // Implement dark mode logic here
      // You can dispatch an action to Redux to apply theme globally
    } catch (error) {
      console.error("Error saving dark mode preference:", error);
    }
  };

  // Handle edit avatar
  const handleEditAvatar = () => {
    Alert.alert("Change Avatar", "Choose an option", [
      {
        text: "Take Photo",
        onPress: () => Alert.alert("Info", "Camera feature coming soon"),
      },
      {
        text: "Choose from Gallery",
        onPress: () => Alert.alert("Info", "Gallery feature coming soon"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const menuItems = [
    {
      id: 1,
      icon: "user",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      id: 2,
      icon: "heart",
      title: "My Favourites",
      subtitle: "View your saved courses",
      onPress: () => navigation.navigate("HomeTab"),
    },
    {
      id: 3,
      icon: "award",
      title: "Achievements",
      subtitle: "View your badges and progress",
      onPress: () => navigation.navigate("Achievements"),
    },
    {
      id: 5,
      icon: "settings",
      title: "Settings",
      subtitle: "App preferences and settings",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      id: 6,
      icon: "help-circle",
      title: "Help & Support",
      subtitle: "Get help and contact support",
      onPress: () => navigation.navigate("HelpAndSupport"),
    },
    {
      id: 7,
      icon: "info",
      title: "About",
      subtitle: "App version and information",
      onPress: () =>
        Alert.alert(
          "About SkillUp",
          "SkillUp v1.0.0\nEducation App by UoM Student\n\nLearn skills, earn badges, and join our community!"
        ),
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, darkMode && styles.darkAvatar]}>
            <Text
              style={[styles.avatarText, darkMode && styles.darkAvatarText]}
            >
              {getInitials(user?.name || user?.username || "User")}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editAvatarButton}
            onPress={handleEditAvatar}
          >
            <Feather name="camera" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.userName, darkMode && styles.darkText]}>
          {user?.name || user?.username || "Guest User"}
        </Text>
        <Text style={[styles.userEmail, darkMode && styles.darkSubtext]}>
          {user?.email || "user@example.com"}
        </Text>

        {/* Stats Row */}
        <View
          style={[styles.statsContainer, darkMode && styles.darkStatsContainer]}
        >
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, darkMode && styles.darkText]}>
              {stats.courses}
            </Text>
            <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>
              Courses
            </Text>
          </View>
          <View
            style={[styles.statDivider, darkMode && styles.darkStatDivider]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, darkMode && styles.darkText]}>
              {stats.favorites}
            </Text>
            <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>
              Favourites
            </Text>
          </View>
          <View
            style={[styles.statDivider, darkMode && styles.darkStatDivider]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, darkMode && styles.darkText]}>
              {stats.hours}
            </Text>
            <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>
              Hours
            </Text>
          </View>
        </View>
      </View>

      {/* Dark Mode Toggle */}
      <View style={[styles.section, darkMode && styles.darkSection]}>
        <View style={styles.darkModeContainer}>
          <View style={styles.menuItemLeft}>
            <View
              style={[
                styles.iconContainer,
                darkMode && styles.darkIconContainer,
              ]}
            >
              <Feather name="moon" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.menuItemText}>
              <Text style={[styles.menuTitle, darkMode && styles.darkText]}>
                Dark Mode
              </Text>
              <Text
                style={[styles.menuSubtitle, darkMode && styles.darkSubtext]}
              >
                Toggle dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
            thumbColor={darkMode ? COLORS.white : COLORS.gray}
          />
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.section, darkMode && styles.darkSection]}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index !== menuItems.length - 1 && [
                styles.menuItemBorder,
                darkMode && styles.darkMenuItemBorder,
              ],
              darkMode && styles.darkMenuItem,
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  darkMode && styles.darkIconContainer,
                ]}
              >
                <Feather name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={styles.menuItemText}>
                <Text style={[styles.menuTitle, darkMode && styles.darkText]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.menuSubtitle, darkMode && styles.darkSubtext]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={darkMode ? COLORS.lightGray : COLORS.gray}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, darkMode && styles.darkLogoutButton]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Feather name="log-out" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, darkMode && styles.darkFooterText]}>
          Version 1.0.0
        </Text>
        <Text style={[styles.footerText, darkMode && styles.darkFooterText]}>
          Made 224075K for UoM
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background || "#f5f5f5",
  },
  header: {
    backgroundColor: COLORS.primary || "#13294aff",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  darkHeader: {
    backgroundColor: "#122f5cff",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white || "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.white || "#fff",
  },
  darkAvatar: {
    backgroundColor: "#333",
    borderColor: "#444",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary || "#13294aff",
  },
  darkAvatarText: {
    color: COLORS.white,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary || "#2196F3",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white || "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white || "#fff",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.white || "#fff",
    opacity: 0.9,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  darkStatsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white || "#fff",
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.white || "#fff",
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.white || "#fff",
    opacity: 0.3,
    marginHorizontal: 10,
  },
  darkStatDivider: {
    opacity: 0.2,
  },
  section: {
    backgroundColor: COLORS.white || "#fff",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkSection: {
    backgroundColor: "#2a2a2a",
    shadowOpacity: 0.3,
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray || "#e0e0e0",
  },
  darkMenuItem: {
    borderBottomColor: "#444",
  },
  darkMenuItemBorder: {
    borderBottomColor: "#444",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: COLORS.lightPrimary || "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  darkIconContainer: {
    backgroundColor: "#020a17ff",
  },
  menuItemText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text || "#333",
    marginBottom: 3,
  },
  darkText: {
    color: "#fff",
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.gray || "#666",
  },
  darkSubtext: {
    color: "#aaa",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white || "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.error || "#f44336",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkLogoutButton: {
    backgroundColor: "#2a2a2a",
    borderColor: "#f44336",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.error || "#f44336",
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray || "#666",
    marginVertical: 2,
  },
  darkFooterText: {
    color: "#999",
  },
});

export default ProfileScreen;
