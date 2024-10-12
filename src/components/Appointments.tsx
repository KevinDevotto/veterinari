import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserType } from '../App';

interface Appointment {
  id: number;
  petName: string;
  ownerName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

interface AppointmentsProps {
  userType: UserType;
}

const Appointments: React.FC<AppointmentsProps> = ({ userType }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, petName: 'Max', ownerName: 'John Doe', date: '2024-03-15', time: '10:00', reason: 'Annual checkup', status: 'scheduled' },
    { id: 2, petName: 'Bella', ownerName: 'Jane Smith', date: '2024-03-15', time: '11:30', reason: 'Vaccination', status: 'scheduled' },
  ]);

  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id' | 'status'>>({
    petName: '',
    ownerName: '',
    date: '',
    time: '',
    reason: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = appointments.length + 1;
    setAppointments((prev) => [...prev, { ...newAppointment, id, status: 'scheduled' }]);
    setNewAppointment({ petName: '', ownerName: '', date: '', time: '', reason: '' });
  };

  const handleStatusChange = (id: number, newStatus: 'scheduled' | 'in-progress' | 'completed' | 'cancelled') => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment))
    );
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
      {userType === 'management' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Appointment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="petName"
                value={newAppointment.petName}
                onChange={handleInputChange}
                placeholder="Pet Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="ownerName"
                value={newAppointment.ownerName}
                onChange={handleInputChange}
                placeholder="Owner Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <textarea
              name="reason"
              value={newAppointment.reason}
              onChange={handleInputChange}
              placeholder="Reason for appointment"
              className="w-full p-2 border rounded"
              required
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Plus className="inline-block mr-2" size={16} />
              Add Appointment
            </button>
          </form>
        </div>
      )}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {userType === 'veterinarian' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.petName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}
                  >
                    {appointment.status}
                  </span>
                </td>
                {userType === 'veterinarian' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value as Appointment['status'])}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;