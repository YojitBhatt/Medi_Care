import React, { useState, useEffect } from 'react';
import { Bell, Pill, Calendar, Award, Phone, PlayCircle, TrendingUp, Plus, Check, X, Settings, User, Activity, Clock, Target, Zap } from 'lucide-react';

const MedRehabApp = () => {
  const [activeTab, setActiveTab] = useState('medication');
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Daily at 8:00 AM',
      image: '💊',
      nextDose: '2025-09-22T08:00:00',
      taken: false,
      streak: 15
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      image: '🔵',
      nextDose: '2025-09-22T12:00:00',
      taken: false,
      streak: 12
    }
  ]);

  const [painLevel, setPainLevel] = useState(3);
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Shoulder Rotations',
      duration: '10 minutes',
      completed: false,
      videoUrl: '#',
      description: 'Gentle circular motions to improve shoulder mobility'
    },
    {
      id: 2,
      name: 'Leg Raises',
      duration: '5 minutes',
      completed: true,
      videoUrl: '#',
      description: 'Strengthen quadriceps and improve leg function'
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(1250);

  const takeMedication = (id) => {
    setMedications(meds => 
      meds.map(med => 
        med.id === id 
          ? { ...med, taken: true, streak: med.streak + 1 }
          : med
      )
    );
    setTotalPoints(prev => prev + 10);
  };

  const completeExercise = (id) => {
    setExercises(exercises =>
      exercises.map(ex =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
    setTotalPoints(prev => prev + 15);
  };

  const PainLevelSlider = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-red-500" />
        Daily Pain Level
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>No Pain</span>
          <span>Severe Pain</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={painLevel}
          onChange={(e) => setPainLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-center">
          <span className={`text-2xl font-bold ${
            painLevel <= 3 ? 'text-green-500' :
            painLevel <= 6 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {painLevel}/10
          </span>
        </div>
      </div>
    </div>
  );

  const MedicationCard = ({ medication }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-blue-400">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{medication.image}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.dosage}</p>
            <p className="text-xs text-gray-500">{medication.frequency}</p>
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={() => takeMedication(medication.id)}
            disabled={medication.taken}
            className={`px-4 py-2 rounded-full font-medium ${
              medication.taken
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {medication.taken ? (
              <><Check className="w-4 h-4 inline mr-1" />Taken</>
            ) : (
              <>Take Now</>
            )}
          </button>
          <div className="mt-2 text-xs text-gray-500">
            🔥 {medication.streak} day streak
          </div>
        </div>
      </div>
    </div>
  );

  const ExerciseCard = ({ exercise }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <PlayCircle className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
            <p className="text-sm text-gray-600">{exercise.duration}</p>
            <p className="text-xs text-gray-500">{exercise.description}</p>
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={() => completeExercise(exercise.id)}
            className={`px-4 py-2 rounded-full font-medium ${
              exercise.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {exercise.completed ? (
              <><Check className="w-4 h-4 inline mr-1" />Done</>
            ) : (
              <>Start</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">HealthCompanion</h1>
                <p className="text-sm text-gray-600">Your wellness journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-yellow-600 mr-1" />
                <span className="font-semibold text-yellow-700">{totalPoints} pts</span>
              </div>
              <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
              <User className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('medication')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'medication'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              💊 Medication
            </button>
            <button
              onClick={() => setActiveTab('rehabilitation')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'rehabilitation'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🏃 Rehabilitation
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Progress
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'medication' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Today's Doses</p>
                    <p className="text-2xl font-bold">{medications.filter(m => m.taken).length}/{medications.length}</p>
                  </div>
                  <Pill className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Adherence Rate</p>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">Streak Points</p>
                    <p className="text-2xl font-bold">{totalPoints}</p>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-200" />
                </div>
              </div>
            </div>

            {/* Medications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Today's Medications</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Medication
                </button>
              </div>
              <div className="space-y-4">
                {medications.map(medication => (
                  <MedicationCard key={medication.id} medication={medication} />
                ))}
              </div>
            </div>

            {/* Pharmacy Integration */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Prescription Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800">Auto-Refill Status</h4>
                  <p className="text-sm text-blue-600 mt-1">Next refill in 5 days</p>
                  <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Manage Refills
                  </button>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800">Pharmacy Connection</h4>
                  <p className="text-sm text-green-600 mt-1">CVS Pharmacy - Connected</p>
                  <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rehabilitation' && (
          <div className="space-y-6">
            {/* Pain Level */}
            <PainLevelSlider />

            {/* Today's Exercises */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Exercise Plan</h2>
              <div className="space-y-4">
                {exercises.map(exercise => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            </div>

            {/* Telehealth */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-500" />
                Telehealth Check-ins
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800">Next Appointment</h4>
                  <p className="text-sm text-green-600 mt-1">Dr. Sarah Johnson - Sept 25, 2:00 PM</p>
                  <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Join Call
                  </button>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800">Quick Consultation</h4>
                  <p className="text-sm text-purple-600 mt-1">Schedule urgent care visit</p>
                  <button className="mt-2 bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Goals */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-500" />
                Weekly Goals
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Complete 5 exercise sessions</span>
                  <span className="text-sm text-green-600">3/5 ✓</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-gray-600 mt-1">Medication Adherence</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600 mt-1">Exercise Completion</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-gray-600 mt-1">Day Streak</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4.2</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Pain Level</div>
                </div>
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">This Week's Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Medications Taken</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">13/14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Exercise Sessions</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">6/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Telehealth Check-ins</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">1/1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Points Earned</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">+275</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Recent Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mr-3">🏆</div>
                  <div>
                    <div className="font-medium text-yellow-800">Perfect Week</div>
                    <div className="text-sm text-yellow-600">7 days medication adherence</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl mr-3">💪</div>
                  <div>
                    <div className="font-medium text-green-800">Exercise Warrior</div>
                    <div className="text-sm text-green-600">Completed 50 exercises</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MedRehabApp;