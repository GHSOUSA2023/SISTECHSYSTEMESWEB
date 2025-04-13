'use client';
import { useEffect, useState } from 'react';
import * as React from 'react'
import { useRouter } from 'next/navigation';
import PackageForm from '@/components/packages/PackageForm';

export default function PackageEditPage({ params }) {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = React.use(params)
  const isNew = id === 'new';

  useEffect(() => {
    async function init() {
      if (!isNew && id) {
        await fetchPackage(id);
      }
      setLoading(false);
    }
    init();
  }, [id, isNew]);

  const fetchPackage = async (packageId) => {
    try {
      const response = await fetch(`/api/packages/${packageId}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setPackageData(data);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url = isNew ? '/api/packages' : `/api/packages/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save');
      router.push('/packages');
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!id) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Create Package' : 'Edit Package'}
      </h1>
      <PackageForm
        initialData={packageData}
        onSubmit={handleSubmit}
        isNew={isNew}
      />
    </div>
  );
}
