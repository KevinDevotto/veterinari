import React, { useState } from 'react';
import { Calendar, FileText, Home as HomeIcon, User } from 'lucide-react';
import HomePage from './components/Home';
import Appointments from './components/Appointments';
import MedicalRecords from './components/MedicalRecords';
import Login from './components/Login';
import PetOwner from './components/PetOwner';

export type UserType = 'management' | 'veterinarian' | 'petOwner' | null;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState<UserType>(null);

  if (!userType) {
    return <Login setUserType={setUserType} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Veterinary Clinic</h1>
      </header>
      <main className="flex-grow p-4">
        {activeTab === 'home' && <HomePage userType={userType} />}
        {activeTab === 'appointments' && <Appointments userType={userType} />}
        {activeTab === 'records' && userType === 'veterinarian' && <MedicalRecords />}
        {activeTab === 'petOwner' && userType === 'petOwner' && <PetOwner />}
      </main>
      <nav className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('home')}
              className={`${
                activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'
              } flex flex-col items-center py-4 px-2 text-xs font-medium`}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="mt-1">Home</span>
            </button>
            {(userType === 'management' || userType === 'veterinarian') && (
              <button
                onClick={() => setActiveTab('appointments')}
                className={`${
                  activeTab === 'appointments' ? 'text-blue-600' : 'text-gray-500'
                } flex flex-col items-center py-4 px-2 text-xs font-medium`}
              >
                <Calendar className="h-6 w-6" />
                <span className="mt-1">Appointments</span>
              </button>
            )}
            {userType === 'veterinarian' && (
              <button
                onClick={() => setActiveTab('records')}
                className={`${
                  activeTab === 'records' ? 'text-blue-600' : 'text-gray-500'
                } flex flex-col items-center py-4 px-2 text-xs font-medium`}
              >
                <FileText className="h-6 w-6" />
                <span className="mt-1">Medical Records</span>
              </button>
            )}
            {userType === 'petOwner' && (
              <button
                onClick={() => setActiveTab('petOwner')}
                className={`${
                  activeTab === 'petOwner' ? 'text-blue-600' : 'text-gray-500'
                } flex flex-col items-center py-4 px-2 text-xs font-medium`}
              >
                <User className="h-6 w-6" />
                <span className="mt-1">My Pet</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;