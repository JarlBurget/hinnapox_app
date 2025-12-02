import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFuelPrice } from 'hooks/useFuelPrice';

export type FuelType = '95' | '98' | 'D' | 'EL';

interface PriceCardProps {
  fuel: FuelType;
}

const FuelColorsMap: Record<string, { textStyle: string; bgStyle: string }> = {
  '95': { textStyle: 'text-black', bgStyle: 'bg-green-400' },
  '98': { textStyle: 'text-black', bgStyle: 'bg-orange-400' },
  D: { textStyle: 'text-white', bgStyle: 'bg-black' },
  EL: { textStyle: 'text-white', bgStyle: 'bg-blue-300' },
};

const FuelMapKeys: Record<string, string> = {
  '95': 'petrol95',
  '98': 'petrol98',
  D: 'diesel',
  EL: 'electricity',
};

const PriceCard = ({ fuel }: PriceCardProps) => {
  const { t } = useTranslation();
  const [fuelType] = useState(fuel);
  const [fuelPrice, setFuelPrice] = useState<number | null>(null);

  const { data: priceRaw = fuelType === 'EL' ? 80.0 : 1.4 } = useFuelPrice(fuelType);
  useEffect(() => {
    setFuelPrice(fuelType === 'EL' ? Number((priceRaw / 10).toFixed(2)) : priceRaw); //Kui on elekter (€/MWh), jagame 10-ga, et saada senti/kWh
  }, [priceRaw, fuelType]);

  const fuelTypeTextStyle = FuelColorsMap[fuelType]?.textStyle || 'text-black';
  const fuelTypeBgStyle = FuelColorsMap[fuelType]?.bgStyle || 'bg-gray-200';

  return (
    <View className={styles.container}>
      <View className="my-1 flex-col">
        <Text className="text-xl font-bold dark:text-white">{t(FuelMapKeys[fuelType])}</Text>
        <View className="my-2 flex-row items-center">
          {fuelPrice === null ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Text className="text-4xl font-bold dark:text-white">
              {fuelPrice}{' '}
              <Text className="text-2xl">{fuelType === 'EL' ? t('elecUnit') : '€/L'}</Text>
            </Text>
          )}
        </View>
        <Text className="text-md text-gray-600 dark:text-glass-white">{t('currentPrice')}</Text>
      </View>
      <View
        className={`flex-col justify-center rounded-lg ${fuelTypeBgStyle} w-[6rem] items-center px-4 py-2`}>
        <Text className={`m-0 text-5xl font-bold ${fuelTypeTextStyle}`}>{fuelType}</Text>
      </View>
    </View>
  );
};

const styles = {
  container:
    'flex-row justify-between items-center p-2 px-4 border-2 border-black/5 dark:border-white/5 bg-white dark:bg-theme-dark-tertiary rounded-2xl shadow-lg w-[90%] mt-6 mx-auto',
};

export default PriceCard;
