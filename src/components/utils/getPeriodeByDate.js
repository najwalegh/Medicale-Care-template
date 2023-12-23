export const calculatePeriod = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = Math.abs(end - start);

  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));

  // Formater la chaîne de retour pour une meilleure lisibilité
  const formattedDays = days > 0 ? `${days} jours` : "";
  const formattedHours = hours > 0 ? `${hours} heures` : "";
  const formattedMinutes = minutes > 0 ? `${minutes} minutes` : "";

  // Concaténer les parties formatées avec des virgules et des espaces
  const formattedPeriod = [formattedDays, formattedHours, formattedMinutes]
    .filter(Boolean) // Supprimer les parties vides
    .join(", "); // Joindre avec des virgules

  return formattedPeriod;
};
