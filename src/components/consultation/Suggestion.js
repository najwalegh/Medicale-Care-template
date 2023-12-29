// src/components/Suggestions.js
import React from 'react';

const Suggestions = ({ medicaments, query }) => {
  return (
    <ul>
      {medicaments
        .filter((medicament) =>
          medicament.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
    </ul>
  );
};

export default Suggestions;
