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

interface FormData {
  propertyType: string;
  price: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: string;
  bathrooms: string;
  hasParking: boolean;
  hasPool: boolean;
  hasStorage: number;
}

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null); // Initialize with FormData or null

  const handleButtonClick = (type: string) => {
    console.log(`Button clicked: ${type}`);
    if (type === 'new') {
      setShowWizard(true); // Show the PropertyWizard when "Buy New" is clicked
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
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'bedrooms', label: 'Bedrooms', type: 'select', options: Object.values(Bedrooms) }, // Use enum values
        { name: 'bathrooms', label: 'Bathrooms', type: 'select', options: Object.values(Bathrooms) }, // Use enum values
        { name: 'sqMeters', label: 'Square Meters', type: 'number' },
        { name: 'hasBalcony', label: 'Balcony', type: 'checkbox' },
        { name: 'balconySize', label: 'Balcony Size', type: 'number' },
      ],
    },
    {
      label: 'Purchase Info',
      fields: [
        { name: 'propertyPrice', label: 'Property Price', type: 'number' },
        { name: 'currency', label: 'Currency', type: 'select', options: Object.values(Currency) }, // Use enum values
      ],
    },
    {
      label: 'Contractor',
      fields: [
        { name: 'reservationFee', label: 'Reservation Fee', type: 'number' },
        { name: 'reservationFeePercentage', label: 'Reservation Fee Percentage', type: 'number' },
        { name: 'upfrontPayment', label: 'Upfront Payment', type: 'number' },
        { name: 'constructionPeriod', label: 'Construction Period', type: 'select', options: Object.values(ConstructionPeriod) }, // Use enum values
      ],
    },
    {
      label: 'Expenses',
      fields: [
        { name: 'acCost', label: 'AC Cost', type: 'number' },
        { name: 'furnitureCost', label: 'Furniture Cost', type: 'number' },
        { name: 'lawyerFee', label: 'Lawyer Fee', type: 'number' },
      ],
    },
    {
      label: 'Extra Features',
      fields: [
        { name: 'hasParking', label: 'Parking Included', type: 'checkbox' },
        { name: 'hasStorage', label: 'Storage', type: 'number', default: 0 }, // Added default value
        { name: 'isGatedCommunity', label: 'Inside Gated community', type: 'checkbox' },
        { name: 'hasPool', label: 'Has Pool', type: 'checkbox' },
        { name: 'hasElevator', label: 'Elevator', type: 'checkbox' },

      ],
    },
    {
      label: 'Estimations',
      fields: [
        { name: 'annualAppreciationRate', label: 'Annual Appreciation Rate', type: 'number' },
      ],
    },
    {
      label: 'Investing Path',
      fields: [
        { name: 'flip', label: 'Flip', type: 'checkbox' },
        { name: 'keep', label: 'Keep', type: 'checkbox' },
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