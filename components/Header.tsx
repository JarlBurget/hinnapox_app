import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Import SVG
import SettingIcon from 'assets/icons/Setting.svg'

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const router = useRouter();

    return (
        <View className="absolute top-0 left-0 right-0 z-50 bg-white shadow-md">
            <View className="flex-row items-center justify-between px-4 py-3">

                {/* Left-side placeholder */}
                <View className="w-8" />

                {/* Center title */}
                <Text className="text-lg font-bold text-center flex-1">
                    {title || 'Page Name'}
                </Text>

                {/* Right-side button */}
                <TouchableOpacity
                    onPress={() => {
                        router.push('/settings') //settings router
                    }}
                    className="w-8 h-8 items-center justify-center"
                >
                    <SettingIcon fill="#9A8C8C" width={44} height={44} />
                </TouchableOpacity>

                {/* Bottom border */}
                <View style={{ height: 2, backgroundColor: '#DEE1E6' }} />
            
            </View>
        </View>
    );
};

export default Header;