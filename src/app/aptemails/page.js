'use client';

import { useState, useEffect } from 'react';
import AptEmailsTable from '@/components/aptemails/AptEmailsTable';

export default function AptEmailPage() {
  const [aptemails, setAptEmails] = useState([]);
  const [sortBy, setSortBy] = useState('APT');
  const [searchTerm, setSearchTerm] = useState('');
  const [editApt, setEditApt] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAptEmails();
  }, []);

  const fetchAptEmails = async () => {
    try {
      const response = await fetch('/api/aptemails');
      const data = await response.json();
      setAptEmails(data);
    } catch (error) {
      console.error('Failed to fetch apt emails:', error);
    }
  };

  const filteredAptEmails = () => {
    let filtered = [...aptemails];

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((ae) => {
        const apt = ae.apt?.toString().toLowerCase() ?? '';
        const email = typeof ae.email === 'string' ? ae.email.toLowerCase() : '';
        return apt.includes(term) || email.includes(term);
      });
    }

    if (sortBy === 'APT') {
      filtered.sort((a, b) => {
        const aptA = isNaN(a.apt) ? a.apt : parseInt(a.apt, 10);
        const aptB = isNaN(b.apt) ? b.apt : parseInt(b.apt, 10);
        return aptA > aptB ? 1 : aptA < aptB ? -1 : 0;
      });
    }

    return filtered;
  };

  const onEdit = (ae) => {
    setEditApt(ae);
    setEditEmail(ae.email ?? '');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editApt?.apt) return;

    try {
      await fetch(`/api/aptemails/${editApt.apt}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: editEmail }),
      });

      const updatedList = aptemails.map((item) =>
        item.apt === editApt.apt ? { ...item, email: editEmail } : item
      );
      setAptEmails(updatedList);
      setShowModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Emails des appartements</h1>
      </div>

      {/* Filtros visuais */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Sort by:</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setSortBy('APT')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${sortBy === 'APT'
              ? 'bg-blue-600 text-white opacity-100'
              : 'bg-blue-500 text-white hover:bg-blue-600 opacity-50'
              }`}
          >
            APT
          </button>

          <label htmlFor="searchInput" className="ml-4 text-gray-700 font-medium">
            Search apt email:
          </label>
          <input
            id="searchInput"
            type="text"
            placeholder="Search apt email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-80"
          />
          <button
            onClick={() => setSearchTerm('')}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      <div>
        <AptEmailsTable aptemails={filteredAptEmails()} onEdit={onEdit} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Modifier Email</h3>
            <p className="mb-2"><strong>APT :</strong> {editApt?.apt}</p>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Nouveau email"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
