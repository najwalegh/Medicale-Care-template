import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";

const App3 = ({ onContinue, selectedData }) => {
  const [libelle, setLibelle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Mettre à jour les champs lorsque selectedData change (retour arrière)
    if (selectedData) {
      setLibelle(selectedData.libelle || '');
      setDescription(selectedData.description || '');
    }
  }, [selectedData]);

  // Gestionnaire de soumission de formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const photoScanData = {
      libelle: libelle,
      description: description,
    };
    onContinue(photoScanData);
  };

  const handleGenerateDocument = async () => {
    const pdfContent = generatePDF(); 
  
    try {
      const response = await axios.post('http://localhost:8080/api/createOrd', {
        pdfContent,
        consultationId: '657ddadf4fcd6a78e740872a', 
        type: 'scan',
        date_creation: new Date(),
      });
  
      console.log('PDF saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving PDF:', error.message);
    }
  };
  
  const generatePDF = () => {
    // Create a document PDF with the data
    const pdf = new jsPDF();
    pdf.text(`Libellé: ${libelle}`, 10, pdf.internal.getFontSize() + 10);
    pdf.text(`Description: ${description}`, 10, pdf.internal.getFontSize() * 2 + 10);
    pdf.save('document_scan.pdf');

    // Convert the content to a data URL
    const dataURL = pdf.output('dataurl');
    
    return dataURL;
  };
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="libelle" className="text-gray-500">Libellé:</label>
        <input
          type="text"
          id="libelle"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          className="border border-gray-400 rounded  text-gray-500 m-3 py-3 px-2 leading-tight focus:outline-none"
        />

        <label htmlFor="description"className="text-gray-500">Description:</label>
        <input
          type="text"
          id="description"
          style={{ color: 'black' }}
          className="border border-gray-400 rounded text-gray-500 m-3 py-3 px-2 leading-tight focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </form>
      <br />
      <button type="button" onClick={handleGenerateDocument} className="btn btn-lg">Generate PDF </button><br />

    </div>
  );
};

export default App3;
