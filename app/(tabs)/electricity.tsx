import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PriceCard from '../../components/PriceCard';
import ElectricityChart from '../../components/ElectricityChart'
export default function ElectricityScreen() {
  return (
    <View className="flex-1 bg-[#F5F5F5]">

      {/* Header */}
      <View className="px-4 pt-14 pb-4 flex-row items-center justify-between bg-white shadow">
        <Text className="text-xl font-semibold">Elekter</Text>
        <Text className="text-2xl text-gray-600">⚙️</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="p-4"
        contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
      >
        {/* REUSE YOUR Fuel PriceCard */}
        <PriceCard fuel="EL" />

        {/* Chart Card */}
        <ElectricityChart />
      </ScrollView>
    </View>
  );
}
