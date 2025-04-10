import { View, Text, TextInput, TouchableOpacity, Animated, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = () => {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

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

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

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

  const handleSignUp = async () => {
    const validationPassed = validate(); // Use your existing validation logic
  if (!validationPassed) return;

  try {
    // Store email and password
    await AsyncStorage.setItem('userData', JSON.stringify({ email, password }));
    router.replace('/login');
  } catch (err) {
    console.error('Error saving user data:', err);
  }
};

  return (
    <AppGradient colors={["#0a4d4a", "#161b2e"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center px-6"
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text className="text-4xl font-bold text-white text-center mb-8">Create Account</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 mb-1"
          />
          {errors.name && <Text className="text-red-400 mb-2">{errors.name}</Text>}

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 mb-1"
          />
          {errors.email && <Text className="text-red-400 mb-2">{errors.email}</Text>}

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 mb-1"
          />
          {errors.password && <Text className="text-red-400 mb-4">{errors.password}</Text>}

          <TouchableOpacity className="bg-white rounded-xl py-4" onPress={handleSignUp}>
  <Text className="text-center text-[#0a4d4a] font-semibold text-lg">Sign Up</Text>
</TouchableOpacity>


          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace('/login')}
          >
            <Text className="text-center text-gray-300">Already have an account? <Text className="text-white underline">Log In</Text></Text>
          </TouchableOpacity>
        </Animated.View>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </AppGradient>
  );
};

export default SignUp;
