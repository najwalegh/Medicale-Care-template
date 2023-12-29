import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";

const App2 = ({ onContinue, selectedChoices }) => {
  const [analysesData, setAnalysesData] = useState([
    { name: 'Ionogramme', choices: ['Uree', 'Creatinine', 'Acide urique', 'Na+','Cli-','Bicarbonates','Ca++','Phosohore'] },
    { name: 'Hématologie', choices: ['NFS', 'CRP', 'VS', 'Hémoculture'] },
    { name: 'Bilan martiale', choices: ['CTF', 'CST', 'Transferrine', 'Ferritine'] },
    // Add more analyses with their choices
  ]);

  const [selectedAnalyses, setSelectedAnalyses] = useState([]);


  useEffect(() => {
    // When the component is mounted, update choices with the choices from the parent page
    if (Array.isArray(selectedChoices)) {
      setSelectedAnalyses(selectedChoices);
    } else {
      setSelectedAnalyses([]);
    }
  }, [selectedChoices]);

  const handleGenerateDocument = async () => {
  const pdfContent = generatePDFContent(selectedAnalyses);
  handleSaveDocument();
  try {
    const response = await axios.post('http://localhost:8080/api/createOrd', {
      pdfContent,
      consultationId: '657ddadf4fcd6a78e740872a', 
      type:"analyse" ,
      date_creation:new Date,
    });

    console.log('PDF saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving PDF:', error.message);
  }

  };

  const generatePDFContent = (analyses) => {
    let content = '';

    analyses.forEach((analysis) => {
      content += `Analyse: ${analysis.name}\n`;

      analysis.choices.forEach((choice, index) => {
        content += `  ${index + 1}. ${choice}\n`;
      });

      content += '\n';
    });

    return content;
  };
  const handleSaveDocument = () => {
    // Create a document PDF with the selected choices
    const pdf = new jsPDF();
  
    console.log('Generating document...');
  
    let content = ''; // Chaîne pour stocker le contenu de toutes les analyses
  
    selectedAnalyses.forEach((analysis) => {
      console.log(`Analyse: ${analysis.name}`);
  
      content += `Analyse: ${analysis.name}\n`;
  
      analysis.choices.forEach((choice, index) => {
        console.log(`  ${index + 1}. ${choice}`);
        content += `  ${index + 1}. ${choice}\n`;
      });
  
      content += '\n'; 
    });
  
    // Utiliser pdf.text une seule fois pour afficher tout le contenu sur une page
    pdf.text(content, 10, pdf.internal.getFontSize() + 10);
  
    console.log('Finished generating document');
  
    pdf.save('document.pdf');
  };

  const handleAnalysisSelect = (analysisName, choice) => {
    // Create a copy of the list of analyses
    const updatedAnalyses = selectedAnalyses.map((analysis) => ({ ...analysis }));

    // Find the index of the analysis in the list
    const analysisIndex = updatedAnalyses.findIndex((analysis) => analysis.name === analysisName);

    if (analysisIndex !== -1) {
      // Update choices of the existing analysis
      const choices = updatedAnalyses[analysisIndex].choices.includes(choice)
        ? updatedAnalyses[analysisIndex].choices.filter((c) => c !== choice)
        : [...updatedAnalyses[analysisIndex].choices, choice];

      // Update the existing analysis with the new choices
      updatedAnalyses[analysisIndex] = {
        name: analysisName,
        choices: choices,
      };
    } else {
      // Add a new analysis with the choice
      updatedAnalyses.push({
        name: analysisName,
        choices: [choice],
      });
    }

    // Update the state with the new list of analyses
    setSelectedAnalyses(updatedAnalyses);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap">
        {analysesData.map((analysisItem) => (
          <div key={analysisItem.name} className="w-full md:w-1/2 lg:w-1/4 p-4">
            <p className="font-bold">{analysisItem.name}</p>
            <ul className="list-disc">
              {analysisItem.choices.map((choice) => (
                <li key={choice} className="mb-2">
                  <input
                    type="checkbox"
                    id={`${analysisItem.name}-${choice}`}
                    className="mr-2 cursor-pointer"
                    checked={selectedAnalyses.some(
                      (analysis) =>
                        analysis.name === analysisItem.name && analysis.choices.includes(choice)
                    )}
                    onChange={() => handleAnalysisSelect(analysisItem.name, choice)}
                  />
                  <label htmlFor={`${analysisItem.name}-${choice}`}>{choice}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleGenerateDocument} className="btn btn-lg">Generate PDF </button><br />
    </div>
  );
};

export default App2;