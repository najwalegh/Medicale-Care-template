import React, { useState } from 'react';


function SearchBar({ searchTerm, onSearch, onSelect }) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setLocalSearchTerm(value);
      onSearch(value);
    };
  
    return (
      <div className='p-4'>
        <input
          type="text"
          id="medSearch"
          value={localSearchTerm}
          onChange={handleInputChange}
          className="border border-gray-400 rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none"
        />  
      </div>
    );
  }
export default SearchBar;
