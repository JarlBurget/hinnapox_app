import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useColorScheme } from 'nativewind';

// Import SVG
import SettingIcon from 'assets/icons/Setting.svg';
import { useTranslation } from 'react-i18next';

const pathTitles: { [key: string]: string } = {
  '/': 'homeTab',
  '/fuel': 'petrolTab',
  '/electricity': 'electricityTab',
  '/map': 'mapTab',
  '/settings': 'settingsTab',
};

const Header = () => {
  const [title, setTitle] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#647373' : '#9A8C8C';

  useEffect(() => {
    setTitle(t(pathTitles[pathname]));
  }, [pathname, t]);

  return (
    <View className="border-b border-gray-100 bg-white dark:border-glass-white dark:bg-theme-dark-primary">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-center text-3xl font-bold dark:text-white">{title || 'Page Name'}</Text>

        <TouchableOpacity
          onPress={() => {
            router.push('/settings');
          }}
          className="items-center justify-center">
          <SettingIcon fill={iconColor} width={36} height={36} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
