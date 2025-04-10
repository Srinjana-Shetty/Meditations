import { View, Animated,Text, ImageBackground, SafeAreaView, Image,} from 'react-native'
import React from 'react'
import beachImage from "@/assets/meditation-images/beach.webp"
import { useEffect, useRef } from 'react';

import {StatusBar} from "expo-status-bar"
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import AppGradient from '@/components/AppGradient'

const App = () => {

  const router = useRouter()

  const fadeAnim = useRef(new Animated.Value(0)).current;
const slideAnim = useRef(new Animated.Value(20)).current;

useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }),
  ]).start();
}, []);

  return (
    <View className='flex-1'>
      <ImageBackground
      source={beachImage}
      resizeMode='cover'
      className='flex-1'
      >
        
        <AppGradient colors={["rgba(0,0,0,0.4)","rgba(0,0,0,0.8)"]}>
          
          <SafeAreaView className='flex-1 mx-5 my-12 justify-between'>
          <Animated.View
  style={{
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  }}
>
  <Text className='text-center text-white font-bold text-4xl'>
    Tap In. Zone Out
  </Text>
  <Text className='text-center text-white text-regular text-2xl mt-3'>
    Still as a Lake, Calm as the Breeze
  </Text>
</Animated.View>

              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/images/simpleMeditationLogo.png')}
                style={{ width: 400, height: 400 }}/>
              </View>
              <View>
                <CustomButton onPress={() => router.push('/login')} title='Step In'/>
              </View>
              <StatusBar style='light'/>
          </SafeAreaView>
         
        </AppGradient>
      </ImageBackground>
      
    </View>
  )
}

export default App