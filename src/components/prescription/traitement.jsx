import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MedicineList from "./MedicineList";
import PrescriptionForm from "./PrescriptionForm";
import PDFGenerator from "./PDFGenerator";
import jsPDF from "jspdf";
import medicinesData from "../../data/data.json";
import { useGetMaladiesByConsultation } from "../../hooks/consultations/useGetMaladiesByConsultation";
import { useLocation } from "react-router-dom";
import { AlertInfo } from "../utils/AlertInfo";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [prescriptionData, setPrescriptionData] = useState({
    dosage: "",
    duration: "",
  });
  const location = useLocation();
  const { id } = location.state ?? { id: null };

  // Fetch patient conditions
  const { status, maladies, gender } = useGetMaladiesByConsultation(id);

  // Function to get alert message based on selected medicines and patient conditions
  const getAlertMessage = (selectedMedicines, maladies) => {
    if (searchTerm === "") {
      return "Aucune alerte spécifique."; // No specific alert if search term is empty
    }

    // Condition 1
    if (maladies.includes("Maladie cardiaque")) {
      if (
        maladies.includes("Angioplastie") &&
        maladies.includes("Spondylarthrite ankylosante")
      ) {
        // Condition 2
        if (
          selectedMedicines.some((med) => med.category === "Anti-inflammatoire")
        ) {
          return "Le patient est cardiaque avec une opération angioplastie ne doit pas prendre des anti-inflammatoires pour traiter le rhumatologie.";
        } else if (
          selectedMedicines.some((med) => med.category === "Corticoïdes")
        ) {
          // Condition 3
          return "Oui, c'est mieux de prendre des Corticoïdes au lieu des anti-inflammatoires pour traiter le rhumatologie dans ce cas.";
        }

        // Condition 4
        if (
          maladies.includes("Diabète") &&
          selectedMedicines.some((med) => med.category === "Corticoïdes")
        ) {
          return "Le patient est diabétique aussi, une augmentation des doses d’insuline ou médicament doit être envisagée pour régler la glycémie.";
        }

        // Example condition 5
        if (
          gender === "FEMALE" &&
          selectedMedicines.some((med) => med.category === 'Anti-inflammatoire')
        ) {
          return "La patiente est féminin elle faut pas prendre des anti-inflammatoires, il faut envisager de l’informer qu’elle ne doit pas être enceinte ou envisager de l’être au moins 3 mois après arrêt des médicaments.";
        }
      }
    }

    // Default message
    return "Aucune alerte spécifique.";
  };

  const alertMessage = getAlertMessage(selectedMedicines, maladies);

  // Function to clear search and reset medicines
  const handleClearSearch = () => {
    setSearchTerm("");
    setPrescriptionData({ dosage: "", duration: "" });
    setMedicines([]);
  };

  // Function to handle medicine search
  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value === "") {
      const filteredByService = medicinesData
        .filter(
          (service) => !selectedService || service.service === selectedService
        )
        .flatMap((service) => service.medicaments);

      setMedicines(filteredByService);
      setPrescriptionData({ dosage: "", duration: "" });
      return;
    }

    const filteredByService = medicinesData
      .filter(
        (service) => !selectedService || service.service === selectedService
      )
      .flatMap((service) => service.medicaments);

    const filteredMedicines = filteredByService.filter((medicine) => {
      const medicineName = medicine.name.toLowerCase();
      const searchValue = value.toLowerCase();
      return medicineName.startsWith(searchValue);
    });

    setMedicines(filteredMedicines);
  };

  // Function to handle medicine selection
  const handleMedicineSelect = (medicine) => {
    setSelectedMedicines([...selectedMedicines, medicine]);
    setPrescriptionData({
      dosage: medicine.frequency || "",
      duration: medicine.duration || "",
    });
  };

  // Function to handle prescription update
  const handlePrescriptionUpdate = (prescriptionData, selectedMedicine) => {
    const updatedPrescription = selectedMedicines.map((med) => ({
      ...med,
      prescriptionData: {
        ...(prescriptionData.dosage && { dosage: prescriptionData.dosage }),
        ...(prescriptionData.duration && {
          duration: prescriptionData.duration,
        }),
      },
    }));

    setPrescription([...prescription, ...updatedPrescription]);
    setSelectedMedicines([]);
  };

  // Function to remove medicine from prescription
  const handleRemoveFromPrescription = (medicineToRemove) => {
    const updatedPrescription = prescription.filter(
      (med) => med !== medicineToRemove
    );
    setPrescription(updatedPrescription);
  };

  // Function to generate PDF and save to the database
  const handleGeneratePDF = async () => {
    const pdf = new jsPDF();

    prescription.forEach((med, index) => {
      const yOffset = index * 30;

      pdf.text(`Médicament ${index + 1}: ${med.name}`, 10, 20 + yOffset);
      if (med.prescriptionData.dosage) {
        pdf.text(`Dosage: ${med.prescriptionData.dosage}`, 20, 30 + yOffset);
      }
      if (med.prescriptionData.duration) {
        pdf.text(`Durée: ${med.prescriptionData.duration}`, 20, 40 + yOffset);
      }

      pdf.line(10, 45 + yOffset, 200, 45 + yOffset);
    });

    // Convert PDF to base64
    const pdfContent = pdf.output("datauristring");

    // Save PDF to the database
    try {
      const response = await axios.post('http://localhost:8080/api/createOrd', {
        pdfContent,
        consultationId: '657ddadf4fcd6a78e740872a', // replace with the actual consultation ID
        type: 'traitement',
        date_creation: new Date(),
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving PDF to the database:', error);
    }
    // pdf.save("ordonnance.pdf");
  };

  // Function to handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setMedicines([]);
  };

  return (
    <div className="flex">
      <div className="w-1/2 mr-4 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <label
          htmlFor="service"
          className="text-2xl font-primary p-4 text-accent"
        >
          Choisissez le service
        </label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => handleServiceSelect(e.target.value)}
          className="m-4 px-3 py-2 border border-gray-400 rounded text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none"
        >
          <option value="">Tous les services</option>
          <option value="Cardiologie">Cardiologie</option>
          <option value="Rhumatologie">Rhumatologie</option>
          <option value="Endocrinologie">Endocrinologie</option>
        </select>
        <h3 className="text-2xl font-primary p-4 text-accent">
          Cherchez un médicament :
        </h3>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onSelect={handleMedicineSelect}
          onClear={handleClearSearch}
        />
        {searchTerm && (
          <MedicineList
            medicines={medicines}
            selectedMedicines={selectedMedicines}
            onSelect={handleMedicineSelect}
          />
        )}
        <PrescriptionForm
          selectedMedicines={selectedMedicines}
          onUpdate={handlePrescriptionUpdate}
          prescriptionData={prescriptionData}
        />
      </div>
      <div className="w-1/2 p-4 bg-accent/80">
        <h3 className="text-2xl font-primary mb-4">
          Médicaments sélectionnés :
        </h3>
        {prescription.length > 0 && (
          <ul className="list-disc pl-4">
            {prescription.map((med, index) => (
              <li key={index} className="mb-2">
                {med.name} -{" "}
                {med.prescriptionData.dosage &&
                  `Dosage: ${med.prescriptionData.dosage}, `}
                {med.prescriptionData.duration &&
                  `Durée: ${med.prescriptionData.duration}`}
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

        <PDFGenerator
          prescription={prescription}
          onGeneratePDF={handleGeneratePDF}
        />

        {alertMessage && (
          <div className="alerts">
            <h3>Alerte :</h3>
            <AlertInfo message={alertMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
