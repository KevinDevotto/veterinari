import React, { useState } from 'react';

interface Pet {
  name: string;
  species: string;
  breed: string;
  age: number;
}

interface AppointmentRequest {
  date: string;
  time: string;
  reason: string;
}

const PetOwner: React.FC = () => {
  const [pet] = useState<Pet>({
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 5,
  });

  const [appointmentRequest, setAppointmentRequest] = useState<AppointmentRequest>({
    date: '',
    time: '',
    reason: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the appointment request to the server
    console.log('Appointment request submitted:', appointmentRequest);
    alert('Appointment request submitted successfully!');
    setAppointmentRequest({ date: '', time: '', reason: '' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Pet</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {pet.name}</p>
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age} years</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Request Appointment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={appointmentRequest.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              name="time"
              value={appointmentRequest.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <textarea
            name="reason"
            value={appointmentRequest.reason}
            onChange={handleInputChange}
            placeholder="Reason for appointment"
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Request Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetOwner;