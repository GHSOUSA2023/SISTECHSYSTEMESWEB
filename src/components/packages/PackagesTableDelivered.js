export default function PackagesTableDelivered({ packages, onDelete, onEdit }) {
  // Fonction pour calculer la différence en jours entre la date de livraison et la date de réception
  // Function to calculate the difference in days between delivery date and received date
// Nouvelle fonction adaptée pour calculer pkg.date_delivery - pkg.date
// New function adapted to calculate pkg.date_delivery - pkg.date
const calculeteDaysDifference = (deliveryDateString, receivedDateString) => {
  // Si l'une des deux chaînes de date est absente, retourner "N/A"
  // If either date string is missing, return "N/A"
  if (!deliveryDateString || !receivedDateString) return 'N/A';

  // Fonction interne pour parser la chaîne et retourner un objet Date
  // Internal function to parse the string and return a Date object
  const parseDate = (dateString) => {
    // Diviser la chaîne pour extraire la partie date et heure
    // Split the string to extract the date and time parts
    const [datePart] = dateString.split(' ');

    // Séparer le jour, le mois et l'année
    // Split day, month, and year
    const [day, month, year] = datePart.split('/').map(Number);

    // Créer un objet Date
    // Create a Date object
    const dateObj = new Date(year, month - 1, day);

    // Vérifier si la date est valide
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return null;

    // Réinitialiser les heures, minutes, secondes et millisecondes
    // Reset hours, minutes, seconds, and milliseconds
    dateObj.setHours(0, 0, 0, 0);

    return dateObj;
  };

  // Parser les deux dates
  // Parse both dates
  const deliveryDate = parseDate(deliveryDateString);
  const receivedDate = parseDate(receivedDateString);

  // Si l'une des deux dates est invalide, retourner "Invalid Date"
  // If either date is invalid, return "Invalid Date"
  if (!deliveryDate || !receivedDate) return 'Invalid Date';

  // Calculer la différence en millisecondes
  // Calculate the difference in milliseconds
  const differenceInTime = deliveryDate.getTime() - receivedDate.getTime();

  // Retourner 0 si la différence est négative
  // Return 0 if the difference is negative
  if (differenceInTime < 0) return 0;

  // Convertir la différence en jours
  // Convert the difference to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  // Retourner le nombre de jours
  // Return the number of days
  return differenceInDays;
};


  return (
    // Conteneur principal avec défilement horizontal activé
    // Main container with horizontal scrolling enabled
    <div className="overflow-x-auto">
      {/* Table des paquets livrés avec structure et styles */}
      {/* Delivered package table with structure and styles */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {/* En-têtes de colonnes */}
            {/* Column headers */}
            <th className="px-6 py-3 border-b text-left">Enterprise</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Apt</th>
            <th className="px-6 py-3 border-b text-left">Received Date</th>
            <th className="px-6 py-3 border-b text-left">Quantity</th>
            <th className="px-6 py-3 border-b text-left">Pickup Date</th>
            <th className="px-6 py-3 border-b text-left">Days to Pickup</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              {/* Affichage des données du paquet */}
              {/* Displaying package data */}
              <td className="px-6 py-4 border-b">{pkg.enterprise}</td>
              <td className="px-6 py-4 border-b">{pkg.nom}</td>
              <td className="px-6 py-4 border-b">{pkg.apt}</td>
              <td className="px-6 py-4 border-b">{pkg.date}</td>
              <td className="px-6 py-4 border-b text-center">{pkg.qtd}</td>
              <td className="px-6 py-4 border-b">{pkg.date_delivery}</td>
              <td className="px-6 py-4 border-b text-center">{calculeteDaysDifference(pkg.date_delivery, pkg.date)}</td>

              {/* Boutons pour modifier ou supprimer le paquet */}
              {/* Buttons to edit or delete the package */}
              <td className="px-6 py-4 border-b">
                <button
                  onClick={() => onEdit(pkg.id)}
                  className="text-blue-500 hover:text-blue-700 mr-4 cursor-not-allowed opacity-50"
                  disabled
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(pkg.id)}
                  className="text-red-500 hover:text-red-700 cursor-not-allowed opacity-50"
                  disabled
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}