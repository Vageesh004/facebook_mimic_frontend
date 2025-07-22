import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
       
        <Stack.Screen name="createPost" options={{ title: 'Create Post' }} />
        <Stack.Screen name="postFeed" options={{ title: 'Posts Feed' }} />
      </Stack>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
}