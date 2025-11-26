import React from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import Svg, { Path, Line as SvgLine } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { useFuelPricesHistory, useElectricityHistory } from 'hooks/useFuelPrice';

export interface ChartData {
  fuel: string;
  prices: number[];
  label: string;
  color: string;
}

interface PriceChartProps {
  fuelTypes?: ('95' | '98' | 'D' | 'EL')[];
}

const createMultiLinePath = (
  prices: number[],
  width: number,
  height: number,
  dataIndex: number
): string => {
  if (!prices.length) return '';

  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const range = max - min || 1;

  const step = width / (prices.length - 1 || 1);
  let d = `M 0 ${height - ((prices[0] - min) / range) * height}`;

  prices.forEach((val, i) => {
    const x = i * step;
    const y = height - ((val - min) / range) * height;
    d += ` L ${x} ${y}`;
  });

  return d;
};

export const FuelConfig: Record<string, { label: string; color: string; apiKey: string }> = {
  '95': { label: 'petrol95', color: '#10B981', apiKey: '95' },
  '98': { label: 'petrol98', color: '#F59E0B', apiKey: '98' },
  D: { label: 'diesel', color: '#000000', apiKey: 'D' },
  EL: { label: 'electricity', color: '#3B82F6', apiKey: 'EL' },
};

export default function PriceChart({ fuelTypes = ['95', 'D'] }: PriceChartProps) {
  const { t } = useTranslation();

  const width = Dimensions.get('window').width - 60;
  const height = 250;

  // Fetch fuel and electricity data
  const fuelTypesFiltered = fuelTypes.filter((f) => f !== 'EL') as ('95' | '98' | 'D')[];
  const hasElectricity = fuelTypes.includes('EL');

  const {
    data: fuelChartData,
    isLoading: fuelLoading,
    error: fuelError,
  } = useFuelPricesHistory(fuelTypesFiltered);
  const { data: elecChartData, isLoading: elecLoading, error: elecError } = useElectricityHistory();

  // Combine data
  const chartData = [
    ...(fuelChartData || []),
    ...(hasElectricity && elecChartData ? elecChartData : []),
  ];

  const isLoading = fuelLoading || (hasElectricity && elecLoading);
  const error = fuelError || elecError;

  if (isLoading) {
    return (
      <View className="mt-6 px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="mt-6 px-5">
        <Text style={{ color: '#EF4444' }}>{t('errorLoadingPrices')}</Text>
      </View>
    );
  }

  if (chartData.length === 0) {
    return (
      <View className="mt-6 px-5">
        <Text>{t('currentPrice')}</Text>
      </View>
    );
  }

  // Use the first fuel type's data length as x-axis reference
  const allPrices = chartData
    .flatMap((c) => c.prices)
    .filter((p) => typeof p === 'number' && !isNaN(p) && p > 0);

  if (allPrices.length === 0) {
    return (
      <View className="mt-6 px-5">
        <Text style={{ color: '#EF4444' }}>No valid price data available</Text>
      </View>
    );
  }

  const globalMax = Math.max(...allPrices);
  const globalMin = Math.min(...allPrices);
  const globalRange = globalMax - globalMin || 1;

  return (
    <View className="mt-6 px-5">
      <Text className="mb-2 text-center text-xl font-semibold text-gray-700">
        {t('priceComparison')} - {t('last30Days')}
      </Text>

      <View className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <View className="mb-4 flex-row flex-wrap gap-3">
          {chartData.map((chart) => (
            <View key={chart.fuel} className="flex-row items-center gap-2">
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  backgroundColor: chart.color,
                }}
              />
              <Text className="text-xs text-gray-600">{t(chart.label)}</Text>
            </View>
          ))}
        </View>
        <View className="relative w-full">
          {/* Y-axis labels overlaid on chart */}
          <View
            className="absolute bottom-0 left-0 top-0 z-10 w-12 justify-between pr-2"
            pointerEvents="none">
            {Array.from({ length: 5 }).map((_, i) => {
              const price = globalMax - (i / 4) * globalRange;
              return (
                <Text key={`label-${i}`} className="text-right text-xs text-gray-400">
                  {price.toFixed(2)} €
                </Text>
              );
            })}
          </View>

          {/* Chart */}
          <Svg width={width} height={height} style={{ backgroundColor: '#FFFFFF' }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const y = (height / 4) * i;
              return (
                <SvgLine
                  key={`grid-${i}`}
                  x1="0"
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="#F0F0F0"
                  strokeWidth="1"
                />
              );
            })}

            {chartData.map((chart, idx) => {
              const path = createMultiLinePath(chart.prices, width, height, idx);
              return [
                <Path
                  key={`path-${chart.fuel}`}
                  d={path}
                  stroke={chart.color}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />,
              ];
            })}
          </Svg>
        </View>
      </View>

      {/* Summary */}
      <View className="mt-4 gap-2">
        {chartData.map((chart: ChartData) => {
          if (!chart.prices || chart.prices.length === 0) return null;

          const validPrices = chart.prices.filter(
            (p: number) => typeof p === 'number' && !isNaN(p) && p > 0
          );
          if (validPrices.length === 0) return null;

          const avgPrice = (
            validPrices.reduce((a: number, b: number) => a + b, 0) / validPrices.length
          ).toFixed(2);
          const maxPrice = Math.max(...validPrices).toFixed(2);
          const minPrice = Math.min(...validPrices).toFixed(2);

          return (
            <View
              key={chart.fuel}
              className="rounded-lg bg-gray-50 p-3"
              style={{ borderWidth: 2, borderColor: chart.color }}>
              <Text className="font-semibold text-gray-800">{t(chart.label)}</Text>
              <View className="mt-1 flex-col justify-between text-xs text-gray-800">
                <Text>
                  {t('average')}: {avgPrice} €
                </Text>
                <Text>
                  {t('maximum')}: {maxPrice} €
                </Text>
                <Text>
                  {t('minimum')}: {minPrice} €
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
