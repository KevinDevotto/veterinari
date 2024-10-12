import React, { useState } from 'react';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

const UserRegistration: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the user data to the server
    console.log('New user registered:', userData);
    alert('User registered successfully!');
    setUserData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Register New Pet Owner</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Register User
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;