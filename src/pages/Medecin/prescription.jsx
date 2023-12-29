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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';

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
  const [documents, setDocuments] = React.useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setDocuments([]);
  };

  const handleDocumentClick = async (idDoc) => {
      setSelectedDocument(idDoc);
      setModalIsOpen(true);
      console.log('Document Data:', documents);
      console.log('Document Datghgha:', idDoc);

 
  };

  React.useEffect(() => {
    // Fetch documents based on your API endpoint (getDocByFilters)
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/getDocByFilters', {
          idMed: "657b5a358f7bce11ef7fbf59", // Replace with the actual medical professional ID
          idPat: "657b18a4a438444afabd3164", // Replace with the actual patient ID
          status: "Processing", // Replace with the actual status
        });
        const idDoc = response.data;
        console.log('Document ID:', idDoc);

        if (idDoc) {
          const docResponse = await axios.get(`http://localhost:8080/api/getDocById/${idDoc}`);
          const documentData = docResponse.data;
          console.log('le document est ',documentData);
          setDocuments([documentData]);
        }
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    fetchData();
  }, []); // Run the effect once when the component mounts
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState(null);


  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <Header />
      <div className='container mx-auto '>
              {/* Affichez les cartes des documents */}
              <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
          {documents.map((document) => (
            <Card
              key={document._id}
              sx={{ maxWidth: 200, cursor: 'pointer' }}
              onClick={() => handleDocumentClick(document)}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {document.type}
                </Typography>
                <Typography color="text.secondary">{document.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Affichez le modal avec React-PDF */}
        <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Document Modal"
>
  <button onClick={closeModal}>Close Modal</button>
  {selectedDocument && (
  <div>
    <h2>Document </h2>
    {selectedDocument.map((doc, index) => {
      const docType = Object.keys(doc)[0];
      console.log('docType.data ', doc[docType]?.data);
      console.log('docType ', docType);
      console.log('doc ', doc);

      if (doc[docType]?.data) {
        // Accéder à la propriété data à l'aide de la notation point
        // const pdfData = doc[docType].data;

        // Ou accéder à la propriété data à l'aide de la notation crochets
        const pdfData = doc[docType]['data'];

        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        return (
          <div key={index}>
            <h3>Type: {docType}</h3>
            <Document file={pdfUrl}>
              <Page pageNumber={1} />
            </Document>
          </div>
        );
      } else {
        console.error('Invalid document format:', doc);
        return null;
      }
    })}
  </div>
)}

</Modal>


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
