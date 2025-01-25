import { useState, useEffect } from 'react';

export default function PackageForm({ initialData, onSubmit, isNew }) {
  const [formData, setFormData] = useState({
    nom: '',
    apt: '',
    enterprise: '',
    date: '',
    date_delivery: '',
    qtd: 1,
    status: 'Received'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Apartment:</label>
        <input
          type="text"
          value={formData.apt}
          onChange={(e) => setFormData({ ...formData, apt: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Enterprise:</label>
        <input
          type="text"
          value={formData.enterprise}
          onChange={(e) => setFormData({ ...formData, enterprise: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Date:</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Delivery Date:</label>
        <input
          type="date"
          value={formData.date_delivery}
          onChange={(e) => setFormData({ ...formData, date_delivery: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          value={formData.qtd}
          onChange={(e) => setFormData({ ...formData, qtd: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status:</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Received">Received</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isNew ? 'Create' : 'Update'} Package
      </button>
    </form>
  );
}
