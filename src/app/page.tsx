"use client";

import styles from "./page.module.css";
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import PropertyWizard from './components/PropertyWizard'; // Adjust the path as necessary
import steps from './components/stepsConfig'; // Import the steps constant
import { Currency, ConstructionPeriod, Bedrooms, Bathrooms, YearsToKeep } from './components/enums'; // Import enums

interface FormData {
  propertyType: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  hasParking: boolean;
  hasPool: boolean;
  hasBalcony: boolean;
  hasStorage: number;
  squareMeters: number;
  balconySize: number;
  furnitureCost: number;
  annualAppreciationRate: number;
  currency: string;
  acCost: number;
  lawyerFee: number;
  yearsToKeep: number;
  reservationFee: number;
  reservationFeePercentage: number;
  upfrontPayment: number;
  constructionPeriod: number;
  flip: boolean;
  keep: boolean;
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