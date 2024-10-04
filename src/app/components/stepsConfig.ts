import { Currency, ConstructionPeriod, Bedrooms, Bathrooms, YearsToKeep } from './enums'; // Adjust the import path as necessary

const steps = [
  {
    label: 'Location',
    fields: [
      { name: 'address', label: 'Address', type: 'text', default: '123 Default St' },
      { name: 'bedrooms', label: 'Bedrooms', type: 'select', options: Object.values(Bedrooms), default: Bedrooms.One },
      { name: 'bathrooms', label: 'Bathrooms', type: 'select', options: Object.values(Bathrooms), default: Bathrooms.One },
      { name: 'squareMeters', label: 'Square Meters', type: 'number', default: 65 },
      { name: 'hasBalcony', label: 'Balcony', type: 'checkbox', default: true },
      { name: 'balconySize', label: 'Balcony Size', type: 'number', default: 8 },
    ],
  },
  {
    label: 'Purchase Info',
    fields: [
      { name: 'price', label: 'Property Price', type: 'number', default: 265000 },
      { name: 'currency', label: 'Currency', type: 'select', options: Object.values(Currency), default: Currency.Euro },
    ],
  },
  {
    label: 'Contractor',
    fields: [
      { name: 'reservationFee', label: 'Reservation Fee', type: 'number', default: 5000 },
      { name: 'reservationFeePercentage', label: 'Reservation Fee Percentage', type: 'number', default: 2 },
      { name: 'upfrontPayment', label: 'Upfront Payment', type: 'number', default: 10000 },
      { name: 'constructionPeriod', label: 'Construction Period', type: 'select', options: Object.values(ConstructionPeriod), default: ConstructionPeriod.TwoYears },
    ],
  },
  {
    label: 'Expenses',
    fields: [
      { name: 'acCost', label: 'AC Cost', type: 'number', default: 750 },
      { name: 'furnitureCost', label: 'Furniture Cost', type: 'number', default: 5000 },
      { name: 'lawyerFee', label: 'Lawyer Fee', type: 'number', default: 2200 },
    ],
  },
  {
    label: 'Extra Features',
    fields: [
      { name: 'hasParking', label: 'Parking Included', type: 'checkbox', default: false },
      { name: 'hasStorage', label: 'Storage', type: 'number', default: 0 },
      { name: 'isGatedCommunity', label: 'Inside Gated community', type: 'checkbox', default: false },
      { name: 'hasPool', label: 'Has Pool', type: 'checkbox', default: false },
      { name: 'hasElevator', label: 'Elevator', type: 'checkbox', default: true },
    ],
  },
  {
    label: 'Estimations',
    fields: [
      { name: 'annualAppreciationRate', label: 'Annual Appreciation Rate', type: 'number', default: 1 },
      { name: 'yearsToKeep', label: 'Years to Keep Before Selling', type: 'select', options: Object.values(YearsToKeep), default: YearsToKeep.Five },
    ],
  },
  {
    label: 'Investing Path',
    fields: [
      { name: 'flip', label: 'Flip', type: 'checkbox', default: true },
      { name: 'keep', label: 'Keep', type: 'checkbox', default: false },
    ],
  },
  // ... other steps
];

export default steps;
