import { View, Text, FlatList, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';
import { MEDITATION_DATA } from '@/constants/MeditationData';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export const options = {
  headerShown: false,
};

const NatureMeditate = () => {
  const navigation = useNavigation();

  return (
    <View className='flex-1'>
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className='mb-6 mt-10'>
          {/* Drawer Toggle Icon */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="absolute top-1 right-5 z-10"
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
          <Text className='text-gray-200 mb-3 ml-3 font-bold text-4xl text-left'>
            Welcome
          </Text>
          <Text className='text-indigo-100 ml-3 font-medium text-xl'>
            Let's make magic happen!✨
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className='mb-20'
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/meditate/${item.id}`)}
                className='h-48 px-4 my-3 overflow-hidden'
                style={{ borderRadius: 12 }}
              >
                <ImageBackground
                  source={MEDITATION_IMAGES[item.id - 1]}
                  resizeMode='cover'
                  className='flex-1 justify-center'
                  imageStyle={{ borderRadius: 10 }}
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    className='flex-1 justify-center items-center'
                    style={{ borderRadius: 12 }}
                  >
                    <Text className='text-gray-100 text-3xl font-bold text-center'>
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
      <StatusBar style='light' />
    </View>
  );
};

export default NatureMeditate;
