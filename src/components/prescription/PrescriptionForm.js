import React, { useState } from 'react';

function PrescriptionForm({ selectedMedicines, onUpdate }) {
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');

  const handleUpdate = () => {
    selectedMedicines.forEach((medicine) => {
      onUpdate({ dosage, duration }, medicine);
    });

    setDosage('');
    setDuration('');
  };

  return (
    <div className="mt-2 p-4">
      {selectedMedicines.length > 0 && (
        <form className="flex flex-col space-y-2">
          <label htmlFor="dosage" className="text-gray-500">
            Dosage:
          </label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="px-3 py-2 border border-gray-400 rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none"
            placeholder="Entrez le dosage"
          />
          <label htmlFor="duration" className="text-gray-500">
            Durée:
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="px-3 py-2 border border-gray-400 rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none"
            placeholder="Entrez la durée"
          />
          <button
            type="button"
            onClick={handleUpdate}
            className="btn btn-lg bg-accent text-white hover:bg-accent-dark"
          >
            Ajouter à l'ordonnance
          </button>
        </form>
      )}
    </div>
  );
}

export default PrescriptionForm;
