// app/navigation/AppNavigator.js - UPDATED VERSION WITH PROFILE
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";

import { checkAuth } from "../store/slices/authSlice";
import { loadFavorites } from "../store/slices/coursesSlice";
import { COLORS } from "../constants/colors";

// Import screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/home/HomeScreen";
import DetailsScreen from "../screens/details/DetailsScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import AchievementsScreen from "../screens/profile/AchievementsScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import HelpAndSupportScreen from "../screens/profile/HelpAndSupportScreen";
import { TouchableOpacity, Text } from "react-native";
import { logout } from "../store/slices/authSlice";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
   dispatch(logout());
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "FavoritesTab") {
            iconName = "heart";
          } else if (route.name === "ProfileTab") {
            iconName = "user";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: "bold" },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Courses",
          headerTitle: `Welcome, ${
            user?.firstName || user?.username || "User"
          }`,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                marginRight: 15,
                alignItems: "center",
              }}
            >
              <Feather name="bell" size={24} color={COLORS.white} />

              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <Feather name="log-out" size={20} color={COLORS.white} />
                <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          headerTitle: "My Favorites",
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <Feather name="filter" size={24} color={COLORS.white} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerTitle: "My Profile",
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <Feather name="settings" size={24} color={COLORS.white} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(checkAuth());
      await dispatch(loadFavorites());
      setIsLoading(false);
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Course Details",
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Edit Profile",
              }}
            />
            <Stack.Screen
              name="Achievements"
              component={AchievementsScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Achievements",
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Settings",
              }}
            />
            <Stack.Screen
              name="HelpAndSupport"
              component={HelpAndSupportScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Help & Support",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
