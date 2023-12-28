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
import SearchBar from '../../components/consultation/TreatmentForm';
// import App2 from '../../components/consultation/AnalysisForm';
// import App3 from '../../components/consultation/ScanForm';
import { useState } from 'react';

const steps = [
  {
    label: 'Ordonnance de traitement',
    description: `Prescrire des médicaments pour traiter une condition médicale.`,
    component: <SearchBar />,
  },
  {
    label: 'Ordonnance d\'analyse',
    description: 'Prescrire des tests médicaux pour évaluer la santé.',
    // component: <App2 />,
  },
  {
    label: 'Ordonnance de scan',
    description: `Prescrire des examens d'imagerie médicale pour un diagnostic approfondi.`,
    // component: <App3 />,
  },
];

export default function Consultation() {
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

  const [medicaments, setMedicaments] = useState([]);

  React.useEffect(() => {
    // Charger les données depuis le fichier local (assurez-vous que le chemin est correct)
    fetch('../../components/consultation/2014.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched successfully:', data);
        setMedicaments(data);
      })
      .catch((error) => console.error('Error fetching medicaments:', error));
  }, []);
  const handleSearch = (query) => {
    // Logique de recherche
    const results = medicaments.filter((medicament) =>
      medicament.name.toLowerCase().includes(query.toLowerCase())
    );
    // Afficher les résultats dans la console (vous pouvez ajuster cette logique)
    console.log('Résultats de la recherche :', results);
  };

  return (
    <>
      <Header />
      <div className='container mx-auto '>
        <Box sx={{ maxWidth: 400 }}>
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
