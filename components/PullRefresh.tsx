import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from 'nativewind';

interface PullRefreshProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const PullRefresh = ({ children, style }: PullRefreshProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const { colorScheme } = useColorScheme();

  const spinnerColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const spinnerBackgroundColor = colorScheme === 'dark' ?  '#000000' : '#ffffff';
   

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Fake 2 second timeout
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

            // Android colors
            colors={[spinnerColor]}  
            progressBackgroundColor={spinnerBackgroundColor}

            // iOS color
            tintColor={spinnerColor} 
            style={{ backgroundColor: colorScheme === 'dark'  ? '#000000' : '#ffffff' }}
            title="Refreshing..."             // iOS text
        />
      }
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Takes up all available space
  },
  contentContainer: {
    flexGrow: 1, // Ensures the container fills height even if content is short
  },
});

export default PullRefresh;