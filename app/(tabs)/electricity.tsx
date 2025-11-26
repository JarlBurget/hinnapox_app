import React from 'react';
import PriceCard from '../../components/PriceCard';
import PriceChart from '../../components/PriceChart';

export default function ElectricityScreen() {
  return (
    <>
      <PriceCard fuel="EL" />
      <PriceChart fuelTypes={['EL']} />
    </>
  );
}
