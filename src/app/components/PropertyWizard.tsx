'use client';

import React, { useState, ChangeEvent } from 'react'
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField, 
  Typography, 
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

const theme = createTheme()

interface PropertyWizardProps {
  steps: { label: string; fields: any[] }[];
  onSubmit: (data: any) => void; // Add the onSubmit prop
}

export default function PropertyWizard({ steps, onSubmit }: PropertyWizardProps) {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    propertyType: 'defaultType', // Set a default value
    price: '0', // Default price
    address: '123 Default St', // Default address
    city: 'Default City', // Default city
    state: 'Default State', // Default state
    zipCode: '00000', // Default zip code
    bedrooms: '1', // Default number of bedrooms
    bathrooms: '1', // Default number of bathrooms
    hasParking: false, // Default parking
    hasPool: false, // Default pool
    hasStorage: 0, // Default storage
    squareMeters: 30, // Default value for square meters
    balconySize: 8,  // Default value for balcony size
    currency: 'euro', // Default currency is euro
    acCost: '750', // Default AC cost in euro
    lawyerFee: '2200', // Default lawyer fee in euro
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
    setLoading(true)
    console.log('Form submitted:', formData)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate a delay for the loading spinner
    setLoading(false);
    onSubmit(formData); // Trigger the callback with form data
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
            ) : (
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
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
        <Box className="footer">
          {/* Footer content here */}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

interface FormData {
    propertyType?: string;
    price?: string;
    address?: string;
    squareMeters?: number; // Add this line
    balconySize?: number;   // Add this line
    currency?: string; // Add this line
    acCost?: string; // Add this line
    lawyerFee?: string; // Add this line
}