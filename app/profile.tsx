import { View, Text, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from "expo-image-picker";
import { useMeditationStore } from "../store/store"; // adjust path accordingly
import dayjs from "dayjs";
import { router } from 'expo-router';

const Profile = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const sessions = useMeditationStore((state) => state.sessions);

  // Total completed
  const totalMeditations = sessions.length;

  // Total time spent
  const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Streak logic
  const streak = (() => {
    const sorted = [...sessions].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
    let count = 0;
    let current = dayjs();

    for (let s of sorted) {
      if (dayjs(s.date).isSame(current, "day")) {
        count++;
        current = current.subtract(1, "day");
      } else if (dayjs(s.date).isSame(current.subtract(1, "day"), "day")) {
        count++;
        current = current.subtract(1, "day");
      } else {
        break;
      }
    }
    return count;
  })();

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow access to photo library.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  const handleProfileImageOptions = () => {
    const options = [
      {
        text: "Edit Image",
        onPress: pickImage,
      },
    ];

    if (profileImage) {
      options.push({
        text: "Remove Image",
        style: "destructive",
        onPress: () => setProfileImage(null),
      });
    }

    options.push({ text: "Cancel", style: "cancel" });

    Alert.alert("Profile Photo", "Choose an action", options);
  };

  return (
    <View className='flex-1'>
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        {/* Drawer Toggle Icon */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="absolute top-20 right-5 z-10"
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>

        {/* Back Icon */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-20 left-6 z-10"
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>

        {/* Profile Image + Info */}
        <View className="flex-1 items-center justify-center p-6">
          <TouchableOpacity onPress={handleProfileImageOptions} className="mb-6">
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            ) : (
              <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center border-4 border-white">
                <Ionicons name="camera" size={36} color="#555" />
              </View>
            )}
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-1">Srinjana</Text>
          <Text className="text-indigo-100 text-lg">Mindful Explorer ✨</Text>
        </View>

        {/* Stats */}
        <View className="mt-10 px-8 space-y-4">
          <View className="bg-white/10 p-4 rounded-xl">
            <Text className="text-white text-lg font-semibold">🌱 Meditations Completed</Text>
            <Text className="text-indigo-100 mt-1 text-base">{totalMeditations} sessions</Text>
          </View>
          <View className="bg-white/10 p-4 rounded-xl">
            <Text className="text-white text-lg font-semibold">⏳ Time Spent</Text>
            <Text className="text-indigo-100 mt-1 text-base">{hours} hours {minutes} mins</Text>
          </View>
          <View className="bg-white/10 p-4 rounded-xl">
            <Text className="text-white text-lg font-semibold">🎯 Streak</Text>
            <Text className="text-indigo-100 mt-1 text-base">{streak} days</Text>
          </View>
        </View>

        {/* Edit Profile */}
        <TouchableOpacity className="mt-10 mx-8 bg-white/20 p-4 rounded-xl items-center">
          <Text className="text-white text-base font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </AppGradient>
      <StatusBar style='light' />
    </View>
  );
};

export default Profile;
