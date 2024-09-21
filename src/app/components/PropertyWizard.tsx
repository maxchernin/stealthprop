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
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    propertyType: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    hasParking: false,
    hasPool: false,
    hasStorage: 0, // Added default value for hasStorage
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