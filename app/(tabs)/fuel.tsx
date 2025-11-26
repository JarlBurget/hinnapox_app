import React from 'react';
import PriceCard from 'components/PriceCard';
import PriceChart from 'components/PriceChart';

const Fuel = () => {
  return (
    <>
      <PriceCard fuel="95" />
      <PriceCard fuel="98" />
      <PriceCard fuel="D" />
      <PriceChart fuelTypes={['95', '98', 'D']} />
    </>
  );
};

export default Fuel;
