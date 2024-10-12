import React from 'react';
import { UserType } from '../App';
import UserRegistration from './UserRegistration';
import PetRegistration from './PetRegistration';

interface HomeProps {
  userType: UserType;
}

const Home: React.FC<HomeProps> = ({ userType }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome, {userType === 'management' ? 'Management User' : userType === 'veterinarian' ? 'Dr. Veterinarian' : 'Pet Owner'}
      </h2>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          {userType === 'management'
            ? 'Here you can manage appointments, register new pet owners, and add new pets.'
            : userType === 'veterinarian'
            ? 'Here you can view appointments and create medical records for your patients.'
            : 'Here you can view your pet\'s information and request appointments.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userType === 'management' && (
            <>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Appointment Requests</h3>
                <p className="text-blue-600">You have 3 new appointment requests to process.</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">User Registration</h3>
                <p className="text-green-600">Click below to register new pet owners.</p>
                <UserRegistration />
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Pet Registration</h3>
                <p className="text-yellow-600">Click below to register new pets.</p>
                <PetRegistration />
              </div>
            </>
          )}
          {userType === 'veterinarian' && (
            <>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Today's Appointments</h3>
                <p className="text-blue-600">You have 5 appointments scheduled for today.</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Recent Medical Records</h3>
                <p className="text-green-600">3 medical records were created in the last 24 hours.</p>
              </div>
            </>
          )}
          {userType === 'petOwner' && (
            <>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Your Pet</h3>
                <p className="text-blue-600">Max - Golden Retriever, 5 years old</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Upcoming Appointment</h3>
                <p className="text-green-600">March 20, 2024 at 2:00 PM</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;