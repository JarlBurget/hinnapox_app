import React from 'react';
import { Slot } from 'expo-router';
import NavBar from 'components/NavBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from 'components/Header';
import { View } from 'react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <Header />
      <Slot />
      <NavBar />
    </View>
  );
}
