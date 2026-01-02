import React from 'react';
import AddressCard from './AddressCard';

const addresses = [
  {
    country: 'United States',
    address: '16 Cove Road \n Mount Arlington, NJ 07856',
  },
  {
    country: 'Canada',
    address: '123 Main Street \n Toronto, ON M5V 2N2',
  },
  {
    country: 'United Kingdom',
    address: '456 High Street \n London, SW1A 0AA',
  },
  {
    country: 'Australia',
    address: '789 George Street \n Sydney, NSW 2000',
  },
    {
    country: 'United States',
    address: '16 Cove Road \n Mount Arlington, NJ 07856',
  },
  {
    country: 'Canada',
    address: '123 Main Street \n Toronto, ON M5V 2N2',
  },
  {
    country: 'United Kingdom',
    address: '456 High Street \n London, SW1A 0AA',
  },
  {
    country: 'Australia',
    address: '789 George Street \n Sydney, NSW 2000',
  },
];

const AddressGrid = ({isBackground}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {addresses.map((address, index) => (
        <AddressCard
          key={index}
          country={address.country}
          address={address.address}
          isBackground={isBackground}
        />
      ))}
    </div>
  );
};

export default AddressGrid;
