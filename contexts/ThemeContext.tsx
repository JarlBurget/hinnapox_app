import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemePreference;
  colorScheme: ColorSchemeName;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'THEME_PREFERENCE';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // NativeWind color scheme hook
    const { colorScheme: nativeWindScheme, setColorScheme } = useNativeWindColorScheme();
    
    // State to hold theme preference
    const [theme, setThemeState] = useState<ThemePreference>('system');
    
    // Load preference from storage on mount
    useEffect(() => {
        const loadTheme = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (storedTheme) {
            setThemeState(storedTheme as ThemePreference);
            }
        } catch (error) {
            console.error('Failed to load theme preference:', error);
        }
        };
        loadTheme();
    }, []);

    // Sync NativeWind and Storage whenever 'theme' state changes
    useEffect(() => {
        const syncTheme = async () => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
            
            if (theme === 'system') {
            setColorScheme('system'); 
            } else {
            setColorScheme(theme);
            }
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
        };

        syncTheme();
    }, [theme, setColorScheme]);

    // setTheme to set newTheme
    const setTheme = (newTheme: ThemePreference) => {
        setThemeState(newTheme);
    };

    // toggle (loops: Light -> Dark -> System)
    const toggleTheme = () => {
        setThemeState((prev) => {
        if (prev === 'light') return 'dark';
        return 'light';
        });
    };

    // Determine actual active scheme for UI logic that needs it outside of Tailwind
    // Note: NativeWind's 'colorScheme' usually returns 'light' or 'dark' correctly, 
    // but we can fall back to Appearance.getColorScheme() if needed.
    const activeColorScheme = nativeWindScheme as ColorSchemeName;

    return (
        <ThemeContext.Provider 
        value={{ 
            theme, 
            colorScheme: activeColorScheme, 
            setTheme, 
            toggleTheme 
        }}
        >
        {children}
        </ThemeContext.Provider>
    );
};

    // Custom hook for easy access
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};