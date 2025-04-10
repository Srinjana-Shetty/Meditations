import { View, Text, TextInput, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
  
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (!storedData) {
        setErrors({ email: 'No account found. Please sign up first.' });
        return;
      }
  
      const { email: storedEmail, password: storedPassword } = JSON.parse(storedData);
  
      if (email === storedEmail && password === storedPassword) {
        router.replace('/nature-meditate');
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } catch (err) {
      console.error('Error reading user data:', err);
    }
  };
  

  return (
    <AppGradient colors={["#0a4d4a", "#161b2e"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center px-6"
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text className="text-4xl font-bold text-white text-center mb-8">Welcome Back</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 mb-4"
          />
          {errors.email && <Text className="text-red-400 mb-2">{errors.email}</Text>}

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 mb-6"
          />
          {errors.password && <Text className="text-red-400 mb-4">{errors.password}</Text>}

          <TouchableOpacity
            className="bg-white rounded-xl py-4"
            onPress={handleLogin}
          >
            <Text className="text-center text-[#0a4d4a] font-semibold text-lg">Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace('/signup')}
          >
            <Text className="text-center text-gray-300">Don't have an account? <Text className="text-white underline">Sign Up</Text></Text>
          </TouchableOpacity>
        </Animated.View>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </AppGradient>
  );
};

export default Login;
