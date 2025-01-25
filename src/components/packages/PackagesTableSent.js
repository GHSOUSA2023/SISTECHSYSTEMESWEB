export default function PackagesTableSent({ packages, onDelete, onEdit }) {
  // Fonction pour calculer la différence en jours entre une date donnée et aujourd'hui
  // Function to calculate the difference in days between a given date and today
  const calculeteDaysDifference = (dateString) => {
    // Si la chaîne de date est absente, retourner "N/A"
    // If the date string is missing, return "N/A"
    if (!dateString) return 'N/A';

    // Diviser la chaîne pour extraire la partie date et heure
    // Split the string to extract the date and time parts
    const [datePart] = dateString.split(' ');

    // Séparer le jour, le mois et l'année à partir de la partie date
    // Split the day, month, and year from the date part
    const [day, month, year] = datePart.split('/').map(Number);

    // Créer un objet Date à partir des composants
    // Create a Date object from the components
    const providedDate = new Date(year, month - 1, day);

    // Si la date est invalide, retourner "Invalid Date"
    // If the date is invalid, return "Invalid Date"
    if (isNaN(providedDate.getTime())) return 'Invalid Date';

    // Obtenir la date actuelle et réinitialiser les heures, minutes, secondes et millisecondes
    // Get the current date and reset hours, minutes, seconds, and milliseconds
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Réinitialiser également les heures de la date fournie
    // Also reset the hours of the provided date
    providedDate.setHours(0, 0, 0, 0);

    // Calculer la différence en millisecondes
    // Calculate the difference in milliseconds
    const differenceInTime = currentDate - providedDate;

    // Convertir la différence en jours
    // Convert the difference to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

    // Retourner le nombre de jours, ou 0 si la différence est négative
    // Return the number of days, or 0 if the difference is negative
    return differenceInDays >= 0 ? differenceInDays : 0;
};


  return (
    // Conteneur principal avec défilement horizontal activé
    // Main container with horizontal scrolling enabled
    <div className="overflow-x-auto">
      {/* Table des paquets avec structure et styles */}
      {/* Package table with structure and styles */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {/* En-têtes de colonnes */}
            {/* Column headers */}
            <th className="px-6 py-3 border-b text-left">Enterprise</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Apt</th>
            <th className="px-6 py-3 border-b text-left">Received Date</th>
            <th className="px-6 py-3 border-b text-left">Days Overdue</th>
            <th className="px-6 py-3 border-b text-left">Quantity</th>
            <th className="px-6 py-3 border-b text-left">Notification</th>
            <th className="px-6 py-3 border-b text-left">Notification Date</th>
            <th className="px-6 py-3 border-b text-left">Notification Sent Days Ago</th>
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
              <td className="px-6 py-4 border-b text-center">{pkg.date ? calculeteDaysDifference(pkg.date) : 'N/A'}</td>
              <td className="px-6 py-4 border-b text-center">{pkg.qtd}</td>
              <td className="px-6 py-4 border-b">{pkg.notification ? 'Sent' : 'Not Sent'}</td>
              <td className="px-6 py-4 border-b">{pkg.date_notification || 'N/A'}</td>
              <td className="px-6 py-4 border-b text-center">{pkg.date_notification ? calculeteDaysDifference(pkg.date_notification) : 'N/A'}</td>

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
