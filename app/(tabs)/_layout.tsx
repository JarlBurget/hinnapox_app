import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { Slot, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LayoutWrapper from 'components/LayoutWrapper';
import NavBar from 'components/NavBar';
import Header from 'components/Header';
import PullRefresh from 'components/PullRefresh';


export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // On Server & First Render: use 0
  // On Client (after mount): use actual insets
  const safePaddingTop = isMounted ? insets.top : 0;
  const safePaddingBottom = isMounted ? insets.bottom : 0;

  const pathname = usePathname();
  const isMapScreen = pathname.includes('map');
  // const isSettingsScreen = pathname.includes('settings');
  
  // {...({ suppressHydrationWarning: true } as any)} 
  // View vajab className='dark:bg-theme-dark-primary', et telefoni ise enda theme teha tumedaks
  return (
    <View 
      style={{ flex: 1, paddingTop: safePaddingTop, paddingBottom: safePaddingBottom }} 
      className='dark:bg-theme-dark-primary'
    >      
      <>
        <Header />
          <PullRefresh disabled={isMapScreen}>
            <LayoutWrapper >
              <Slot />
            </LayoutWrapper>
          </PullRefresh>
        <NavBar />
      </>
    </View>
  );
}
