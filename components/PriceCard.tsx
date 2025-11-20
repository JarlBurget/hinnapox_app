import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export type FuelType = '95' | '98' | 'D' | 'EL';

interface PriceCardProps {
  fuel: FuelType;
}

const FuelColorsMap: Record<string, { textStyle: string; bgStyle: string }> = {
  '95': { textStyle: 'text-black', bgStyle: 'bg-green-400' },
  '98': { textStyle: 'text-black', bgStyle: 'bg-green-400' },
  D: { textStyle: 'text-white', bgStyle: 'bg-black' },
  EL: { textStyle: 'text-white', bgStyle: 'bg-blue-300' },
};

const FuelMap: Record<string, string> = {
  '95': 'Bensiin 95',
  '98': 'Bensiin 98',
  D: 'Diisel',
  EL: 'Elekter',
};

const PriceCard = ({ fuel }: PriceCardProps) => {
  const [fuelType] = useState(fuel);
  const [price, setPrice] = useState(19.99);

  useEffect(() => {
    if (!fuelType) return;

    if (fuelType === 'EL') {
      fetch('https://www.err.ee/api/electricityMarketData/get')
        .then((response) => response.json())
        .then((result) => {
          const currentData = new Date();
          const currentTime =
            currentData.getHours() + ':' + currentData.getMinutes().toString().padStart(2, '0');

          const todayDataIndex = result[0].data.time.findIndex(
            (timeRange: string, index: number) => {
              let startTime = timeRange.substring(0, 5);
              let endTime = timeRange.substring(8, 13);
              return currentTime >= startTime && currentTime <= endTime;
            }
          );

          if (!todayDataIndex && todayDataIndex !== 0) {
            setPrice(0);
            return;
          }

          setPrice(result[0].data.price[todayDataIndex] || 0);
        })
        .catch((error) => console.error(error));
      return;
    }

    fetch('https://www.err.ee/api/gasPriceData/get')
      .then((response) => response.json())
      .then((result) => {
        setPrice(result.data[fuelType] || 0);
      })
      .catch((error) => console.error(error));
  }, [fuelType]);

  const fuelTypeTextStyle = FuelColorsMap[fuelType]?.textStyle || 'text-black';
  const fuelTypeBgStyle = FuelColorsMap[fuelType]?.bgStyle || 'bg-gray-200';

  return (
    <View className={styles.container}>
      <View className="my-1 flex-col">
        <Text className="text-xl font-bold">{FuelMap[fuelType]}</Text>
        <Text className="my-2 text-4xl font-bold">
          {price} {fuelType === 'EL' ? '€/MWh' : '€/L'}
        </Text>
        <Text className="text-md text-gray-600">Hetkehind</Text>
      </View>
      <View
        className={`flex-col justify-center rounded-lg ${fuelTypeBgStyle} min-w-20 items-center px-4 py-2`}>
        <Text className={`m-0  text-5xl font-bold ${fuelTypeTextStyle}`}>{fuelType}</Text>
      </View>
    </View>
  );
};

const styles = {
  container:
    'flex-row justify-between items-center p-2 px-4 border-2 border-black/5 bg-white rounded-2xl shadow-lg w-[90%] mt-6',
};

export default PriceCard;
