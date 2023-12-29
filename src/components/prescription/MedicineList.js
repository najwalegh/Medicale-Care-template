import React from 'react';

function MedicineList({ medicines, selectedMedicine, onSelect }) {
  return (
    <div className='p-4'>
      <ul>
        {medicines.map((medicine) => (
          <li
            key={medicine.key}
            className={`cursor-pointer py-2 px-4 mb-2 rounded bg-accent/10 text-primary ${
              selectedMedicine && selectedMedicine.CODE === medicine.CODE
                ? 'bg-blue-500 text-white font-bold'
                : ''
            }`}
            onClick={() => onSelect(medicine)}
          >
  
            {medicine.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineList;
