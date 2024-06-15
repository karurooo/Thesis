import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/user/login" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/specialist/login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth/specialist/signup"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="choice" options={{ headerShown: false }} />
      <Stack.Screen name="auth/user/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/user/towing" options={{ headerShown: false }} />
      <Stack.Screen name="auth/user/home" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/specialist/home"
        options={{ headerShown: false }}
      />
      <Slot />
    </Stack>
  );
};

export default RootLayout;
