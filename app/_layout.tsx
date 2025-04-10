import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Drawer } from "expo-router/drawer";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

// to load resources
SplashScreen.preventAutoHideAsync();

function CustomDrawerContent() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    router.replace("/(auth)/login");
  };

  return (
    <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
      <View className="flex-1 justify-between p-6">
        <View className="space-y-6 mt-10">
          {/* Profile Option */}
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="bg-white/10 p-4 rounded-xl"
          >
            <Text className="text-white text-lg font-semibold">👤 Profile</Text>
          </TouchableOpacity>

          {/* Settings Option */}
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="bg-white/10 p-4 rounded-xl"
          >
            <Text className="text-white text-lg font-semibold">⚙️ Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white p-4 rounded-xl"
        >
          <Text className="text-[#0a4d4a] font-semibold text-center text-lg">
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </AppGradient>
  );
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AsyncStorage.getItem("userData");
        setIsLoggedIn(!!user);
      } catch (e) {
        console.error("Failed to check user login status", e);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded && isLoggedIn !== null) SplashScreen.hideAsync();
  }, [fontsLoaded, error, isLoggedIn]);

  if (!fontsLoaded || isLoggedIn === null) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TimerProvider>
      
        {isLoggedIn ? (
          
          <Drawer
            screenOptions={{ 
              headerShown: false, 
              drawerPosition: "right", 
              drawerStyle: {
                  backgroundColor: "transparent", 
                  width: 300
              }
            }}
            drawerContent={() => <CustomDrawerContent />}
          >
            <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
          </Drawer>
        ) : (
          <Drawer screenOptions={{ headerShown: false, drawerPosition: "right" }}>
            <Drawer.Screen name="(auth)/login" options={{ title: "Login" }} />
            <Drawer.Screen name="(auth)/signup" options={{ title: "Sign Up" }} />
          </Drawer>
        )
        
        }
        
      </TimerProvider>
    </SafeAreaProvider>
  );
}
