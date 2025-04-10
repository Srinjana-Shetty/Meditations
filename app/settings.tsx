import { View, Text, TouchableOpacity, Switch, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const Settings = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Optionally persist using Zustand or AsyncStorage
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  const handleLanguageChange = () => {
    Alert.alert('Coming Soon', 'Language switching feature will be added soon! ✨');
  };

  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        {/* Drawer Toggle */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="absolute top-20 right-5 z-10"
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>

        <Pressable
          onPress={() => router.back()}
          className="absolute top-20 left-6 z-10"
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>

        <View className="mt-28 px-6 space-y-6">
          <Text className="text-white text-3xl font-bold mb-6">⚙️ Settings</Text>

          {/* Dark Mode Toggle */}
          <View className="flex-row justify-between items-center bg-white/10 p-4 rounded-xl">
            <Text className="text-white text-lg">Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? "#4ADE80" : "#ccc"}
              trackColor={{ false: "#777", true: "#4ADE80" }}
            />
          </View>

          {/* Notification Toggle */}
          <View className="flex-row justify-between items-center bg-white/10 p-4 rounded-xl">
            <Text className="text-white text-lg">Notifications</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotifications}
              thumbColor={isNotificationsEnabled ? "#4ADE80" : "#ccc"}
              trackColor={{ false: "#777", true: "#4ADE80" }}
            />
          </View>

          {/* Language Option */}
          <TouchableOpacity
            onPress={handleLanguageChange}
            className="bg-white/10 p-4 rounded-xl"
          >
            <Text className="text-white text-lg">🌐 Change Language</Text>
            <Text className="text-indigo-100 text-base mt-1">Currently: English</Text>
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity className="bg-white/10 p-4 rounded-xl">
            <Text className="text-white text-lg">📘 About This App</Text>
            <Text className="text-indigo-100 text-base mt-1">Built with mindfulness and love 💖</Text>
          </TouchableOpacity>
        </View>
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
};

export default Settings;
