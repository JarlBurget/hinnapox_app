import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Switch, ScrollView } from 'react-native';

const Settings = () => {
  const [language, setLanguage] = useState<'et' | 'en'>('et');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fuelNotification, setFuelNotification] = useState(false);
  const [electricityNotification, setElectricityNotification] = useState(false);

  return (
    <ScrollView className="flex-1  p-4">
      <Text className="mb-2 ml-1 text-gray-500">Keele valik</Text>
      <View className="mb-6 flex-row gap-3">
        <TouchableOpacity
          onPress={() => setLanguage('et')}
          className={`flex-1 items-center rounded-xl py-2.5 ${
            language === 'et' ? 'bg-[#128AEB]' : 'bg-[#E5E5EA]'
          }`}>
          <Text
            className={`text-lg font-medium ${language === 'et' ? 'text-white' : 'text-black'}`}>
            Eesti
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLanguage('en')}
          className={`flex-1 items-center rounded-xl py-2.5 ${
            language === 'en' ? 'bg-[#128AEB]' : 'bg-[#E5E5EA]'
          }`}>
          <Text
            className={`text-lg font-medium ${language === 'en' ? 'text-white' : 'text-black'}`}>
            Inglise
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-2 ml-1 text-gray-500">Stiil</Text>

      <View className="mb-4 flex-row items-center justify-between rounded-lg bg-gray-100 p-4">
        <Text className="text-xl font-semibold text-black">Tume</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#E5E5EA', true: '#128AEB' }}
          thumbColor={'#FFFFFF'}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>

      <Text className="mb-2 ml-1 text-gray-500">Märguanne</Text>
      <View className="flex-col gap-4 ">
        <View className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4">
          <Text className="text-xl font-semibold text-black">Kütuse hind langes</Text>
          <Switch
            value={fuelNotification}
            onValueChange={setFuelNotification}
            trackColor={{ false: '#E5E5EA', true: '#128AEB' }}
            thumbColor={'#FFFFFF'}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>
        <View className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4">
          <Text className="text-xl font-semibold text-black">Elektri hind langes</Text>
          <Switch
            value={electricityNotification}
            onValueChange={setElectricityNotification}
            trackColor={{ false: '#E5E5EA', true: '#128AEB' }}
            thumbColor={'#FFFFFF'}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
