import React from 'react';
import PriceCard from '../../components/PriceCard';
import PriceChart from '../../components/PriceChart';
import ClientOnly from 'components/ClientOnlyComponent';

export default function ElectricityScreen() {
  return (
    <>
      <PriceCard fuel="EL" />
      <ClientOnly>
        <PriceChart fuelTypes={['EL']} />
      </ClientOnly>
    </>
  );
}
