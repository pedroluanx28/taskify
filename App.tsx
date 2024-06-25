import { useCallback, useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';

import { Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Kanit_400Regular, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins'

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { Routes } from './app/routes';
import { useAsyncStorage } from './app/utils/hooks/useAsyncStorage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { getItem } = useAsyncStorage();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Kanit_400Regular,
          Kanit_500Medium,
          Inter_500Medium,
          Inter_700Bold,
          Poppins_600SemiBold,
        });

        await getItem("token");
      } catch (error) {
        console.error(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Routes />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
}
