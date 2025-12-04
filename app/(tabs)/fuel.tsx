import React from 'react';
import PriceCard from 'components/PriceCard';
import PriceChart from 'components/PriceChart';
import ClientOnly from 'components/ClientOnlyComponent';

const Fuel = () => {
  return (
    <>
      <PriceCard fuel="95" />
      <PriceCard fuel="98" />
      <PriceCard fuel="D" />
      <ClientOnly>
         <PriceChart fuelTypes={['95', '98', 'D']} />
      </ClientOnly>
    </>
  );
};

export default Fuel;
