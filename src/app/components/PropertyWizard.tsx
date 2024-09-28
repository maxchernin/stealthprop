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
  constructionPeriod: string;
  flip: boolean; // Add this line
  keep: boolean; // Add this line
}

export default function PropertyWizard({ steps, onSubmit }: PropertyWizardProps) {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    propertyType: 'defaultType',
    price: 265000, // Default property price
    address: '123 Default St',
    bedrooms: 1,
    bathrooms: 1,
    hasParking: false, // Set default to false
    hasPool: false, // Set default to false
    hasBalcony: true, // Set default to true
    hasStorage: 0,
    squareMeters: 65,
    balconySize: 8,
    currency: 'euro',
    acCost: 750, // Default AC cost
    lawyerFee: 2200, // Default lawyer fee
    furnitureCost: 5000, // Default furniture cost
    annualAppreciationRate: 1, // Default annual appreciation rate
    yearsToKeep: 2, // Default years to keep
    reservationFee: 5000, // Default reservation fee
    reservationFeePercentage: 2, // Default reservation fee percentage
    upfrontPayment: 10000, // Default upfront payment
    constructionPeriod: '2 years', // Default construction period
    flip: true, // Initialize this field
    keep: false, // Initialize this field
  })
  const [loading, setLoading] = useState(false)

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
      // Handle the result as needed

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
      </Box>
    </ThemeProvider>
  )
}