import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LayoutWrapper from 'components/LayoutWrapper';

import NavBar from 'components/NavBar';
import Header from 'components/Header';
import PullRefresh from 'components/PullRefresh';


export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  // View vajab className='dark:bg-theme-dark-primary', et telefoni ise enda theme teha tumedaks
  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }} className='dark:bg-theme-dark-primary'>
      <>
        <Header />
          <PullRefresh>
            <LayoutWrapper >
              <Slot />
            </LayoutWrapper>
          </PullRefresh>
        <NavBar />
      </>
    </View>
  );
}
