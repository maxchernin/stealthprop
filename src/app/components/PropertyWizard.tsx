'use client';

import React, { useState, ChangeEvent } from 'react'
import { 
  Stepper, 
  Step, 
  Checkbox,
  StepLabel, 
  Button, 
  TextField, 
  Typography, 
  Paper,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import {
  calculateUpfrontCosts,
  calculateTotalInvestment,
  calculateAppreciation,
  generateReport
} from "./calculations/buyAndAppreciation";
import Report from './Report'; // Ensure you import the Report component correctly

const theme = createTheme()

interface PropertyWizardProps {
  steps: { label: string; fields: any[] }[];
  onSubmit: (data: any) => void;
}

interface FormData {
  propertyType: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  hasParking: boolean;
  hasPool: boolean;
  hasBalcony: boolean;
  hasStorage: number; // Ensure this is a number
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
  constructionPeriod: number; // Change from string to number
  flip: boolean; // Add this line
  keep: boolean; // Add this line
}

// Define the type for report data
type YourReportDataType = {
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
};

export default function PropertyWizard({ steps, onSubmit }: PropertyWizardProps) {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    propertyType: 'defaultType',
    price: 265000,
    address: '123 Default St',
    bedrooms: 1,
    bathrooms: 1,
    hasParking: false,
    hasPool: false,
    hasBalcony: true,
    hasStorage: 0,
    squareMeters: 65,
    balconySize: 8,
    currency: 'euro',
    acCost: 750,
    lawyerFee: 2200,
    furnitureCost: 5000,
    annualAppreciationRate: 1,
    yearsToKeep: 2,
    reservationFee: 5000,
    reservationFeePercentage: 2,
    upfrontPayment: 10000,
    constructionPeriod: 2,
    flip: true,
    keep: false,
  })
  const [loading, setLoading] = useState(false)
  const [reportVisible, setReportVisible] = useState(false) // Add this line
  const [reportData, setReportData] = useState<YourReportDataType | null>(null) // Update this line with the correct type

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value, type } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmission = async () => {
    setLoading(true);
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Calculation result:', result);
        
        // Instead of navigating, set report data and visibility
        setReportData(result);
        setReportVisible(true);

        setLoading(false);

    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderStepContent = (step: number) => {
    const { fields } = steps[step];
    return (
      <>
        {fields.map((field) => (
          <Box key={field.name} sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {field.label}
            </Typography>
            {field.type === 'select' ? (
              <FormControl fullWidth margin="normal">
                <InputLabel>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                >
                  {field.options.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : field.type === 'checkbox' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleInputChange}
                  />
                }
                label={field.label}
              />
            ) : (
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name as keyof FormData]} // {{ edit_1 }}
                onChange={handleInputChange}
                margin="normal"
              />
            )}
          </Box>
        ))}
      </>
    );
  }

  const renderReport = () => {
    if (!reportVisible || reportData === null) return null; // Add check for reportData
    return (
      <Report reportRawData={reportData} /> // Ensure Report is a valid React component
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '45vh' }}>
        <Box sx={{  flex: '1' }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              New Property Wizard
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((stepConfig, index) => (
                <Step key={index}>
                  <StepLabel>{stepConfig.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 4 }}>
              {activeStep === steps.length ? (
                <Typography variant="h5" align="center">
                  Thank you for submitting your property!
                </Typography>
              ) : (
                <>
                  {renderStepContent(activeStep)}
                </>
              )}
            </Box>
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleSubmission : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
          {loading && <CircularProgress sx={{ ml: 2 }} />}
        </Box>
        {renderReport()}
      </Box>
    </ThemeProvider>
  )
}
