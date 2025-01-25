'use client';

import { useState, useEffect } from 'react';
import PackagesTablePending from '@/components/packages/PackagesTablePending';
import PackagesTableSent from '@/components/packages/PackagesTableSent';
import PackagesTableNotSent from '@/components/packages/PackagesTableNotSent';
import PackagesTableDelivered from '@/components/packages/PackagesTableDelivered';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);       // Paquets provenant du backend / Packages from the backend
  const [filteredPackages, setFilteredPackages] = useState([]); // Paquets filtrés / Filtered packages
  const [filter, setFilter] = useState('Received');   // Filtre actif / Active filter
  const [sortBy, setSortBy] = useState('APT');        // Critère de tri / Sorting criteria
  const [dateFilter, setDateFilter] = useState('');   // Filtre de date / Date filter
  const [searchTerm, setSearchTerm] = useState('');   // Terme de recherche / Search term

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [filter, sortBy, packages, dateFilter, searchTerm]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    }
  };

  const applyFilterAndSort = () => {
    let filtered = [...packages];

    if (filter === 'Received') {
      filtered = filtered.filter((pkg) => pkg.status === 'Received');
    } else if (filter === 'true') {
      filtered = filtered.filter((pkg) => pkg.status === 'Received' && pkg.notification === true);
    } else if (filter === 'false') {
      filtered = filtered.filter((pkg) => pkg.status === 'Received' && pkg.notification === false);
    } else if (filter === 'Delivered') {
      filtered = filtered.filter((pkg) => pkg.status === 'Delivered');
    }

    if (dateFilter) {
      filtered = filtered.filter((pkg) => pkg.date.startsWith(dateFilter));
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((pkg) => {
        const apt = pkg.apt ? pkg.apt.toString().toLowerCase() : ''; // Garante que apt seja uma string válida
        const name = pkg.nom ? pkg.nom.toLowerCase() : ''; // Garante que name seja uma string válida

        return apt.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
      });
    }


    if (sortBy === 'APT') {
      filtered.sort((a, b) => {
        const aptA = isNaN(a.apt) ? a.apt : parseInt(a.apt, 10);
        const aptB = isNaN(b.apt) ? b.apt : parseInt(b.apt, 10);
        return aptA > aptB ? 1 : aptA < aptB ? -1 : 0;
      });
    } else if (sortBy === 'Date') {
      filtered.sort((a, b) => {
        const parseDate = (dateStr) => {
          const [date, time] = dateStr.split(' ');
          const [day, month, year] = date.split('/').map(Number);
          return new Date(year, month - 1, day, ...time.split(':').map(Number));
        };

        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        return dateA - dateB;
      });
    }

    setFilteredPackages(filtered);
  };

  const countFilteredPackages = () => {
    return filteredPackages.reduce((total, pkg) => total + pkg.qtd, 0);
  };

  const renderTable = () => {
    switch (filter) {
      case 'Received':
        return <PackagesTablePending packages={filteredPackages} />;
      case 'true':
        return <PackagesTableSent packages={filteredPackages} />;
      case 'false':
        return <PackagesTableNotSent packages={filteredPackages} />;
      case 'Delivered':
        return <PackagesTableDelivered packages={filteredPackages} />;
      default:
        return <PackagesTablePending packages={filteredPackages} />;
    }
  };

  const handleDateFilterChange = (e) => {
    const selectedISODate = e.target.value;
    if (!selectedISODate) {
      setDateFilter('');
      return;
    }
    const [year, month, day] = selectedISODate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    setDateFilter(formattedDate);
  };

  const handleClearDateFilter = () => {
    setDateFilter('');
    const inputElement = document.getElementById('dateFilter');
    if (inputElement) {
      inputElement.value = '';
    }
  };

  return ( //teste
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Packages</h1>
      </div>

      <div className="mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Received')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${filter === 'Received'
              ? 'bg-green-600 text-white opacity-100'
              : 'bg-green-500 text-white hover:bg-green-600 opacity-50'
              }`}
          >
            Pending Pickup
          </button>
          <button
            onClick={() => setFilter('false')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${filter === 'false'
              ? 'bg-orange-600 text-white opacity-100'
              : 'bg-orange-500 text-white hover:bg-orange-600 opacity-50'
              }`}
          >
            Pending Notification
          </button>
          <button
            onClick={() => setFilter('true')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${filter === 'true'
              ? 'bg-yellow-600 text-white opacity-100'
              : 'bg-yellow-500 text-white hover:bg-yellow-600 opacity-50'
              }`}
          >
            Notification Sent
          </button>
          <button
            onClick={() => setFilter('Delivered')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${filter === 'Delivered'
              ? 'bg-purple-600 text-white opacity-100'
              : 'bg-purple-500 text-white hover:bg-purple-600 opacity-50'
              }`}
          >
            Delivered
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Sort by:</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setSortBy('APT')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${sortBy === 'APT'
              ? 'bg-blue-600 text-white opacity-100'
              : 'bg-blue-500 text-white hover:bg-blue-600 opacity-50'
              }`}
          >
            APT
          </button>
          <button
            onClick={() => setSortBy('Date')}
            className={`px-4 py-2 rounded transition-opacity duration-300 ${sortBy === 'Date'
              ? 'bg-indigo-600 text-white opacity-100'
              : 'bg-indigo-500 text-white hover:bg-indigo-600 opacity-50'
              }`}
          > 
            Date
          </button>

          {/* Filtre par date */}
          {/* Date filter */}
          <div className="flex items-center ml-4">
            <label htmlFor="dateFilter" className="mr-2 text-gray-700 font-medium">
              Filter by Date:
            </label>
            <input
              id="dateFilter"
              type="date"
              onChange={handleDateFilterChange}
              className="px-4 py-2 border rounded w-48" />
            <button
              onClick={handleClearDateFilter}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear
            </button>

            {/* Champ de recherche pour APT et Nom / Search field for APT and Name */}
            <label htmlFor="searchInput" className="ml-4 mr-2 text-gray-700 font-medium">
              Search:
            </label>
            <input
              id="searchInput"
              type="text"
              placeholder="Search by APT or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
              className="px-4 py-2 border rounded w-80"
            />
            <button
              onClick={() => setSearchTerm('')} // Limpa o campo de busca ao clicar
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear
            </button>

          </div>
        </div>

        <p className="text-left text-gray-600 text-lg mt-4">
          Total packages for this <strong>{filter}</strong>: <strong>{countFilteredPackages()}</strong>
        </p>
      </div>

      <div>{renderTable()}</div>
    </div>
  );
}