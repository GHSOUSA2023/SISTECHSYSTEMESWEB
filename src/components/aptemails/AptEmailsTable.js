export default function AptEmailsTable({ aptemails, onEdit }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Apartment</th>
            <th className="px-6 py-3 border-b">Email</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {aptemails.map((ae) => (
            <tr key={ae.apt}>
              <td className="px-6 py-4 border-b">{typeof ae.apt === 'string' ? ae.apt : '❌'}</td>
              <td className="px-6 py-4 border-b">{typeof ae.email === 'string' ? ae.email : '❌ email inválido'}</td>
              <td className="px-6 py-4 border-b">
                <button
                  onClick={() => onEdit(ae)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}