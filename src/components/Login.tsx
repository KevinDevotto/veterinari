import React, { useState } from 'react';
import { UserType } from '../App';

interface LoginProps {
  setUserType: (userType: UserType) => void;
}

const Login: React.FC<LoginProps> = ({ setUserType }) => {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleLogin = () => {
    if (selectedType) {
      setUserType(selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <button
            onClick={() => setSelectedType('management')}
            className={`w-full p-2 rounded ${
              selectedType === 'management' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Management User
          </button>
          <button
            onClick={() => setSelectedType('veterinarian')}
            className={`w-full p-2 rounded ${
              selectedType === 'veterinarian' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Veterinarian
          </button>
          <button
            onClick={() => setSelectedType('petOwner')}
            className={`w-full p-2 rounded ${
              selectedType === 'petOwner' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pet Owner
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={!selectedType}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;