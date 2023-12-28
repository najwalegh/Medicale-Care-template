import React, { useState } from 'react';

const App1 = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Ajoutez cet état si vous chargez les données de manière asynchrone

  // Supposons que medicamentsData est la base de données JSON
  // Assurez-vous de remplacer medicamentsData avec vos données réelles
  const medicamentsData = [
    { id: 1, name: 'Medicament 1' },
    { id: 2, name: 'Medicament 2' },
    // ... autres données
  ];

  // Fonction de recherche
  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = medicamentsData.filter((medicament) =>
      medicament.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // Gestionnaire de soumission de formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rechercher un médicament..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      {loading && <p>Chargement des données...</p>}

      {!loading && (
        <ul>
          {searchResults.map((medicament) => (
            <li key={medicament.id}>{medicament.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App1;
