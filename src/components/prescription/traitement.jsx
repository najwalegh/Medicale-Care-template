import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MedicineList from './MedicineList';
import PrescriptionForm from './PrescriptionForm';
import PDFGenerator from './PDFGenerator';
import jsPDF from 'jspdf';
import medicinesData from '../../data/data.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [prescription, setPrescription] = useState([]);

 // Charger les médicaments depuis le fichier JSON au montage du composant
 useEffect(() => {
  setMedicines(medicinesData);
}, []);

const handleSearch = (value) => {
  setSearchTerm(value);

  if (value === '') {
    setMedicines([]);
    return;
  }

  // Filtrer les médicaments en fonction des lettres de recherche successives
  const filteredMedicines = medicinesData.filter((medicine) => {
    const medicineName = medicine.NOM.toLowerCase();
    const searchValue = value.toLowerCase();

    for (let i = 0; i < searchValue.length; i++) {
      if (medicineName[i] !== searchValue[i]) {
        return false;
      }
    }

    return true;
  });

  setMedicines(filteredMedicines);
};

const handleMedicineSelect = (medicine) => {
  setSelectedMedicines([...selectedMedicines, medicine]);
};

const handlePrescriptionUpdate = (prescriptionData, selectedMedicine) => {
  const updatedPrescription = selectedMedicines.map((med) => ({
    ...med,
    prescriptionData: {
      ...(prescriptionData.dosage && { dosage: prescriptionData.dosage }),
      ...(prescriptionData.duration && { duration: prescriptionData.duration }),
    },
  }));

  setPrescription([...prescription, ...updatedPrescription]);
  setSelectedMedicines([]);
};

const handleRemoveFromPrescription = (medicineToRemove) => {
  const updatedPrescription = prescription.filter((med) => med !== medicineToRemove);
  setPrescription(updatedPrescription);
};

const handleGeneratePDF = () => {
  const pdf = new jsPDF();

  prescription.forEach((med, index) => {
    const yOffset = index * 30;
  
    pdf.text(`Médicament ${index + 1}: ${med.NOM}`, 10, 20 + yOffset);
    if (med.prescriptionData.dosage) {
      pdf.text(`Dosage: ${med.prescriptionData.dosage}`, 20, 30 + yOffset);
    }
    if (med.prescriptionData.duration) {
      pdf.text(`Durée: ${med.prescriptionData.duration}`, 20, 40 + yOffset);
    }
  
    pdf.line(10, 45 + yOffset, 200, 45 + yOffset);
  });
  pdf.save('ordonnance.pdf');
};

return (
  <div className="flex">
  <div className=" w-1/2 mr-4 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  <h1 className="text-2xl font-primary p-4 text-accent">Chercher un médicament</h1>
    <SearchBar
      searchTerm={searchTerm}
      onSearch={handleSearch}
      onSelect={handleMedicineSelect}
    />
    {searchTerm && (
      <MedicineList medicines={medicines} selectedMedicines={selectedMedicines} onSelect={handleMedicineSelect} />
    )}
    <PrescriptionForm
      selectedMedicines={selectedMedicines}
      onUpdate={handlePrescriptionUpdate}
    />
  </div>
  <div className="w-1/2 p-4 bg-accent/80"> {/* Ajout de la couleur de fond pour la partie droite */}
    <h1 className="text-2xl font-primary mb-4">Médicaments sélectionnés :</h1>
    {prescription.length > 0 && (
    <ul className="list-disc pl-4">
      {prescription.map((med, index) => (
        <li key={index} className="mb-2">
          {med.NOM} - {med.prescriptionData.dosage && `Dosage: ${med.prescriptionData.dosage}, `}
          {med.prescriptionData.duration && `Durée: ${med.prescriptionData.duration}`}
          <button
            onClick={() => handleRemoveFromPrescription(med)}
            className="ml-2 text-red-500 hover:underline"
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  )}

    <PDFGenerator prescription={prescription} onGeneratePDF={handleGeneratePDF} />
  </div>
</div>
);
}
export default App;