import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

interface MedicalRecord {
  id: number;
  petName: string;
  ownerName: string;
  date: string;
  diagnosis: string;
  treatment: string;
}

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    { id: 1, petName: 'Max', ownerName: 'John Doe', date: '2024-03-10', diagnosis: 'Ear infection', treatment: 'Prescribed antibiotics' },
    { id: 2, petName: 'Bella', ownerName: 'Jane Smith', date: '2024-03-12', diagnosis: 'Annual checkup', treatment: 'Vaccinations updated' },
  ]);

  const [newRecord, setNewRecord] = useState<Omit<MedicalRecord, 'id'>>({
    petName: '',
    ownerName: '',
    date: '',
    diagnosis: '',
    treatment: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = records.length + 1;
    setRecords((prev) => [...prev, { ...newRecord, id }]);
    setNewRecord({ petName: '', ownerName: '', date: '', diagnosis: '', treatment: '' });
  };

  const filteredRecords = records.filter(
    (record) =>
      record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Medical Records</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Medical Record</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="petName"
              value={newRecord.petName}
              onChange={handleInputChange}
              placeholder="Pet Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="ownerName"
              value={newRecord.ownerName}
              onChange={handleInputChange}
              placeholder="Owner Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={newRecord.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <textarea
            name="diagnosis"
            value={newRecord.diagnosis}
            onChange={handleInputChange}
            placeholder="Diagnosis"
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <textarea
            name="treatment"
            value={newRecord.treatment}
            onChange={handleInputChange}
            placeholder="Treatment"
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <Plus className="inline-block mr-2" size={16} />
            Add Medical Record
          </button>
        </form>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4 flex items-center">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search by pet or owner name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.petName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4">{record.diagnosis}</td>
                <td className="px-6 py-4">{record.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecords;