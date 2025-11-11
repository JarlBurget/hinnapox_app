import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

// Import SVG
import SettingIcon from 'assets/icons/Setting.svg'

const pathTitles: { [key: string]:string } = {
    "/": "Home",
    "/fuel": "Fuel Prices",
    "/electricity": "Electricity Prices",
    "/map": "Map",
    "/settings": "Settings"
}

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const pathname = usePathname();
    const router = useRouter();

    const title = pathTitles[pathname];

  return (
    <View className="border-b border-gray-200 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3">
        {/* Left-side placeholder */}
        <View className="w-8" />

        {/* Center title */}
        <Text className="flex-1 text-center text-lg font-bold">{title || 'Page Name'}</Text>

        {/* Right-side button */}
        <TouchableOpacity
          onPress={() => {
            router.push('/settings'); //settings router
          }}
          className="h-8 w-8 items-center justify-center">
          <SettingIcon fill="#9A8C8C" width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
