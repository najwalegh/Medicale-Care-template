import React from 'react';

function PDFGenerator({ prescription, onGeneratePDF }) {
    return (
      prescription.length > 0 && (
        <button type="button" onClick={onGeneratePDF} className="btn btn-lg">
          Générer PDF
        </button>
      )
    );
  }

export default PDFGenerator;
