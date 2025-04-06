import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { focusManager, onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import Home from './(tabs)/home'; 
import NetInfo from '@react-native-community/netinfo';

import { useColorScheme } from '@/components/useColorScheme';
import { AppState, AppStateStatus } from 'react-native';
import { AuthProvider } from '@/context/auth.context';

export { ErrorBoundary } from 'expo-router';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

    const colorScheme = useColorScheme();
  const [queryClient] = useState(() => new QueryClient());


  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, [NetInfo, onlineManager]);

  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onFocusRefetch);

    return () => subscriber.remove();
  }, []);

  const onFocusRefetch = (status: AppStateStatus) => {
    focusManager.setFocused(status == 'active');
  };


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <QueryClientProvider client={queryClient}>
     <AuthProvider>

  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack screenOptions={{ headerShown: false }} initialRouteName='(tabs)'>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
     
      <Stack.Screen name="recope" />
    </Stack>
  </ThemeProvider>
     </AuthProvider>
  </QueryClientProvider>

}

