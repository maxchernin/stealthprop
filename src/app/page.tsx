"use client";

import styles from "./page.module.css";
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import PropertyWizard from './components/PropertyWizard'; // Adjust the path as necessary

// Define Enums
enum Currency {
  Euro = 'euro',
  USD = 'usd',
  ILS = 'ils',
}

enum ConstructionPeriod {
  SixMonths = '6 months',
  OneYear = '1 year',
  TwoYears = '2 years',
  ThreeYears = '3 years',
  FourYears = '4 years',
  FiveYears = '5 years',
}

enum Bedrooms {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
}

enum Bathrooms {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
}

enum YearsToKeep {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
}

interface FormData {
  propertyType: string;
  price: string; // Keep this if it's connected to an input
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: string;
  bathrooms: string;
  hasParking: boolean;
  hasPool: boolean;
  hasStorage: number; // Keep this if it's connected to an input
  // Removed redundant fields: propertyPrice, currency, reservationFee, etc.
}

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null); // Initialize with FormData or null

  const handleButtonClick = (type: string) => {
    console.log(`Button clicked: ${type}`);
    if (type === 'new') {
      setShowWizard(true); // Show the PropertyWizard when "Buy New" is clicked
      setFormData(null); // Clear the formData when clicking on the "Buy New" button
    }
  };

  const handleFormData = (data: FormData) => {
    setFormData(data); // Store the form data
    setShowWizard(false); // Optionally hide the wizard after submission
  };

  const steps = [
    {
      label: 'Location',
      fields: [
        { name: 'address', label: 'Address', type: 'text', default: '123 Default St' },
        { name: 'bedrooms', label: 'Bedrooms', type: 'select', options: Object.values(Bedrooms), default: Bedrooms.One }, // Use enum values
        { name: 'bathrooms', label: 'Bathrooms', type: 'select', options: Object.values(Bathrooms), default: Bathrooms.One }, // Use enum values
        { name: 'squareMeters', label: 'Square Meters', type: 'number', default: 65 },
        { name: 'hasBalcony', label: 'Balcony', type: 'checkbox', default: true },
        { name: 'balconySize', label: 'Balcony Size', type: 'number', default: 8 },
      ],
    },
    {
      label: 'Purchase Info',
      fields: [
        { name: 'price', label: 'Property Price', type: 'number', default: 265000 },
        { name: 'currency', label: 'Currency', type: 'select', options: Object.values(Currency), default: Currency.Euro }, // Use enum values
      ],
    },
    {
      label: 'Contractor',
      fields: [
        { name: 'reservationFee', label: 'Reservation Fee', type: 'number', default: 5000 },
        { name: 'reservationFeePercentage', label: 'Reservation Fee Percentage', type: 'number', default: 2 },
        { name: 'upfrontPayment', label: 'Upfront Payment', type: 'number', default: 10000 },
        { name: 'constructionPeriod', label: 'Construction Period', type: 'select', options: Object.values(ConstructionPeriod), default: ConstructionPeriod.TwoYears }, // Use enum values
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
        { name: 'hasStorage', label: 'Storage', type: 'number', default: 0 }, // Added default value
        { name: 'isGatedCommunity', label: 'Inside Gated community', type: 'checkbox', default: false },
        { name: 'hasPool', label: 'Has Pool', type: 'checkbox', default: false },
        { name: 'hasElevator', label: 'Elevator', type: 'checkbox', default: true },

      ],
    },
    {
      label: 'Estimations',
      fields: [
        { name: 'annualAppreciationRate', label: 'Annual Appreciation Rate', type: 'number', default: 1 },
        { name: 'yearsToKeep', label: 'Years to Keep Before Selling', type: 'select', options: Object.values(YearsToKeep), default: YearsToKeep.Five }, // New field added
      ],
    },
    {
      label: 'Investing Path',
      fields: [
        { name: 'flip', label: 'Flip', type: 'checkbox', default: false },
        { name: 'keep', label: 'Keep', type: 'checkbox', default: true },
      ],
    },
    // ... other steps
  ]

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick('new')}
          >
            Buy New
          </Button>
        </div>
        {showWizard && <PropertyWizard steps={steps} onSubmit={handleFormData} />}
        {formData && (
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            Form Data: {JSON.stringify(formData, null, 2)}
          </Typography>
        )}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}