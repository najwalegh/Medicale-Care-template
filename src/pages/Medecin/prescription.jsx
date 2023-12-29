import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import App from '../../components/prescription/traitement';
import App2 from '../../components/consultation/AnalysForm';
import App3 from '../../components/consultation/ScanForm';
import { useState } from 'react';

const steps = [
  {
    label: 'Ordonnance de traitement',
    description: `Prescrire des médicaments pour traiter une condition médicale.`,
    component: <App />,
  },
  {
    label: 'Ordonnance d\'analyse',
    description: 'Prescrire des tests médicaux pour évaluer la santé.',
    component: <App2 />,
  },
  {
    label: 'Ordonnance de scan',
    description: `Prescrire des examens d'imagerie médicale pour un diagnostic approfondi.`,
    component: <App3 />,
  },
];

function Prescription() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Header />
      <div className='container mx-auto '>
        <Box sx={{  }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <p>{step.description}</p>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {step.component}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </div>
    </>
  );
}
export default Prescription;
