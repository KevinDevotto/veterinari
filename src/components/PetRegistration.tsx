import React, { useState } from 'react';

interface PetData {
  name: string;
  species: string;
  breed: string;
  age: string;
  ownerName: string;
}

const PetRegistration: React.FC = () => {
  const [petData, setPetData] = useState<PetData>({
    name: '',
    species: '',
    breed: '',
    age: '',
    ownerName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the pet data to the server
    console.log('New pet registered:', petData);
    alert('Pet registered successfully!');
    setPetData({ name: '', species: '', breed: '', age: '', ownerName: '' });
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Register New Pet</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={petData.name}
          onChange={handleInputChange}
          placeholder="Pet Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="species"
          value={petData.species}
          onChange={handleInputChange}
          placeholder="Species"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="breed"
          value={petData.breed}
          onChange={handleInputChange}
          placeholder="Breed"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="age"
          value={petData.age}
          onChange={handleInputChange}
          placeholder="Age"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="ownerName"
          value={petData.ownerName}
          onChange={handleInputChange}
          placeholder="Owner Name"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
          Register Pet
        </button>
      </form>
    </div>
  );
};

export default PetRegistration;