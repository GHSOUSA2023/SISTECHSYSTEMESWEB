'use client';
import { useEffect, useState } from 'react';
import PackagesTable from '@/components/packages/PackagesTable';
import { useRouter } from 'next/navigation';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [filter, setFilter] = useState('all'); // Estado do filtro
  const router = useRouter();

  useEffect(() => {
    fetchPackages();
  }, []);

  // Atualiza os pacotes exibidos com base no filtro
  useEffect(() => {
    applyFilter();
  }, [filter, packages]);

  const fetchPackages = async () => {
    const response = await fetch('/api/packages');
    const data = await response.json();
    setPackages(data);
  };

  const applyFilter = () => {
    switch (filter) {
      case 'Received':
        setFilteredPackages(packages.filter(pkg => pkg.status === 'Received'));
        break;
      case 'true':
        setFilteredPackages(packages.filter(pkg => pkg.notification));
        break;
      case 'false':
        setFilteredPackages(packages.filter(pkg => !pkg.notification));
        break;
      case 'Delivered':
        setFilteredPackages(packages.filter(pkg => pkg.status === 'Delivered'));
        break;
      default:
        setFilteredPackages(packages);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this package?')) {
      await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      fetchPackages();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Packages</h1>
      </div>

      {/* Botões de filtro */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('Received')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          List Packages Pending Pickup by Recipient
        </button>
        <button
          onClick={() => setFilter('true')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          List Packages Pending Pickup with Notification Sent
        </button>
        <button
          onClick={() => setFilter('false')}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          List Packages Pending Pickup without Notification Sent
        </button>
        <button
          onClick={() => setFilter('Delivered')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          List All Packages Picked Up by Recipient
        </button>
      </div>

      {/* Tabela de pacotes */}
      <PackagesTable
        packages={filteredPackages}
        onDelete={handleDelete}
        onEdit={(id) => router.push(`/packages/${id}`)}
      />
    </div>
  );
}
