'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [toast, setToast] = useState(false); // Contrôle l'affichage du toast / Controls the toast display

  const handleIncidentClick = () => {
    setToast(true); // Affiche le toast / Displays the toast
    setTimeout(() => setToast(false), 3000); // Cache le toast après 3 secondes / Hides the toast after 3 seconds
  };

  return (
    <div className="flex flex-col items-left -mt-5 bg-gray-50">
      <div className="text-center">
        {/* Titre principal */}
        {/* Main title */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-left">Navigation Menu</h2>
        <div className="flex flex-col gap-4">
          {/* Bouton pour naviguer vers la page des paquets */}
          {/* Button to navigate to the packages page */}
          <button
            onClick={() => router.push('/packages')}
            className="w-64 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300"
          >
            Packages
          </button>
          {/* Bouton pour la gestion des incidents */}
          {/* Button for incident management */}
          <button
            onClick={handleIncidentClick}
            className="w-64 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300"
          >
            Incident Management
          </button>

          <button
            onClick={handleIncidentClick} 
            className="w-64 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300"
          >
            Test Merge
          </button>

          <button
            onClick={handleIncidentClick} 
            className="w-64 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300"
          >
            Test Webhook
          </button>
          
        </div>
      </div>

      {/* Toast */}
      {/* Notification de développement / Development notification */}
      {toast && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white rounded-lg shadow-lg">
          This feature is under development.
        </div>
      )}
    </div>
  );
}
