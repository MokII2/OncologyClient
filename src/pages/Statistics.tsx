import React from 'react';

const Statistics: React.FC = () => {
  // Mock data for demonstration
  const data = [
    { name: 'Stage I', count: 20 },
    { name: 'Stage II', count: 30 },
    { name: 'Stage III', count: 25 },
    { name: 'Stage IV', count: 15 },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Statistics</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Patient Distribution by Cancer Stage</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add more statistical visualizations here */}
    </div>
  );
};

export default Statistics;