export default function PackagesTable({ packages, onDelete, onEdit }) {
  const calculeteDaysDifference = (dateString) => {
    if (!dateString) return 'N/A';
    const [day, month, year] = dateString.split('/').map(Number);
    const providedDate = new Date(year, month -1, day);

    if (isNaN(providedDate)) return 'Invalid Date';

    const currentDate = new Date();
    const differenceInTime = currentDate - providedDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1;
    
    return differenceInDays >= 0 ? differenceInDays : 0;
  };



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Enterprise</th>
            <th className="px-6 py-3 border-b">Name</th>
            <th className="px-6 py-3 border-b">Apt</th>
            <th className="px-6 py-3 border-b">Date</th>
            <th className="px-6 py-3 border-b">Days Overdue</th>
            <th className="px-6 py-3 border-b">Quantity</th>
            <th className="px-6 py-3 border-b">Status</th>
            <th className="px-6 py-3 border-b">Notification</th>
            <th className="px-6 py-3 border-b">Notification Date</th>
            <th className="px-6 py-3 border-b">Notification Sent Days Ago</th>
            <th className="px-6 py-3 border-b">Delivered Date</th>
            <th className="px-6 py-3 border-b">Actions</th>


          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td className="px-6 py-4 border-b">{pkg.enterprise}</td>
              <td className="px-6 py-4 border-b">{pkg.nom}</td>
              <td className="px-6 py-4 border-b">{pkg.apt}</td>
              <td className="px-6 py-4 border-b">{pkg.date}</td>
              <td className="px-6 py-4 border-b">{pkg.date ? calculeteDaysDifference(pkg.date) : 'N/A'}</td>
              <td className="px-6 py-4 border-b">{pkg.qtd}</td>
              <td className="px-6 py-4 border-b">{pkg.status}</td>
              <td className="px-6 py-4 border-b">{pkg.notification ? 'Sent' : 'Not Sent'}</td>
              <td className="px-6 py-4 border-b">{pkg.date_notification || 'N/A'}</td>
              <td className="px-6 py-4 border-b">{pkg.date_notification ? calculeteDaysDifference(pkg.date_notification) : 'N/A'}</td>
              <td className="px-6 py-4 border-b">{pkg.date_delivery}</td>

              <td className="px-6 py-4 border-b">
                <button
                  onClick={() => onEdit(pkg.id)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(pkg.id)}
                  className="text-red-500 hover:text-red-700"
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
