import React, { useState, useEffect } from 'react';
import { Patient, TreatmentRecord, User } from '../types';

const PatientManagement: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [treatmentRecords, setTreatmentRecords] = useState<TreatmentRecord[]>([]);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({});
  const [newTreatmentRecord, setNewTreatmentRecord] = useState<Partial<TreatmentRecord>>({});
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.hospitalNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addOrUpdatePatient = () => {
    if (editingPatient) {
      setPatients(patients.map(p => p.id === editingPatient.id ? { ...editingPatient, ...newPatient } : p));
      setEditingPatient(null);
    } else {
      const patient: Patient = {
        id: String(patients.length + 1),
        hospitalNumber: newPatient.hospitalNumber || '',
        name: newPatient.name || '',
        age: newPatient.age || 0,
        gender: newPatient.gender || 'other',
        dateOfBirth: newPatient.dateOfBirth || '',
        diagnosis: newPatient.diagnosis || '',
        stage: newPatient.stage || '',
        diagnosisDate: newPatient.diagnosisDate || '',
        contactInfo: newPatient.contactInfo || '',
        medicalHistory: newPatient.medicalHistory || '',
      };
      setPatients([...patients, patient]);
    }
    setNewPatient({});
  };

  const startEditingPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setNewPatient(patient);
  };

  const deletePatient = (patientId: string) => {
    setPatients(patients.filter(p => p.id !== patientId));
    setTreatmentRecords(treatmentRecords.filter(tr => tr.patientId !== patientId));
  };

  const addTreatmentRecord = () => {
    const record: TreatmentRecord = {
      id: String(treatmentRecords.length + 1),
      patientId: newTreatmentRecord.patientId || '',
      treatmentPlan: newTreatmentRecord.treatmentPlan || '',
      treatmentDate: newTreatmentRecord.treatmentDate || '',
      treatmentEffect: newTreatmentRecord.treatmentEffect || '',
    };
    setTreatmentRecords([...treatmentRecords, record]);
    setNewTreatmentRecord({});
  };

  const deleteTreatmentRecord = (recordId: string) => {
    setTreatmentRecords(treatmentRecords.filter(tr => tr.id !== recordId));
  };

  const handleSearch = () => {
    // The search is already handled by the filteredPatients variable
    // This function is here in case you want to add additional search functionality
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Patient Management</h1>
      
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search by Hospital Number or Name"
          className="border p-2 flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 ml-2" 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {(currentUser.role === 'super' || currentUser.role === 'admin') && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Hospital Number"
              className="border p-2"
              value={newPatient.hospitalNumber || ''}
              onChange={(e) => setNewPatient({ ...newPatient, hospitalNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              className="border p-2"
              value={newPatient.name || ''}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              className="border p-2"
              value={newPatient.age || ''}
              onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
            />
            <select
              className="border p-2"
              value={newPatient.gender || ''}
              onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value as 'male' | 'female' | 'other' })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              placeholder="Date of Birth"
              className="border p-2"
              value={newPatient.dateOfBirth || ''}
              onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
            />
            <input
              type="text"
              placeholder="Diagnosis"
              className="border p-2"
              value={newPatient.diagnosis || ''}
              onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
            />
            <input
              type="text"
              placeholder="Stage"
              className="border p-2"
              value={newPatient.stage || ''}
              onChange={(e) => setNewPatient({ ...newPatient, stage: e.target.value })}
            />
            <input
              type="date"
              placeholder="Diagnosis Date"
              className="border p-2"
              value={newPatient.diagnosisDate || ''}
              onChange={(e) => setNewPatient({ ...newPatient, diagnosisDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Info"
              className="border p-2"
              value={newPatient.contactInfo || ''}
              onChange={(e) => setNewPatient({ ...newPatient, contactInfo: e.target.value })}
            />
            <textarea
              placeholder="Medical History"
              className="border p-2"
              value={newPatient.medicalHistory || ''}
              onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={addOrUpdatePatient}>
            {editingPatient ? 'Update Patient' : 'Add Patient'}
          </button>
        </div>
      )}
      
      {(currentUser.role === 'super' || currentUser.role === 'admin') && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add Treatment Record</h2>
          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-2"
              value={newTreatmentRecord.patientId || ''}
              onChange={(e) => setNewTreatmentRecord({ ...newTreatmentRecord, patientId: e.target.value })}
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Treatment Plan"
              className="border p-2"
              value={newTreatmentRecord.treatmentPlan || ''}
              onChange={(e) => setNewTreatmentRecord({ ...newTreatmentRecord, treatmentPlan: e.target.value })}
            />
            <input
              type="date"
              placeholder="Treatment Date"
              className="border p-2"
              value={newTreatmentRecord.treatmentDate || ''}
              onChange={(e) => setNewTreatmentRecord({ ...newTreatmentRecord, treatmentDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Treatment Effect"
              className="border p-2"
              value={newTreatmentRecord.treatmentEffect || ''}
              onChange={(e) => setNewTreatmentRecord({ ...newTreatmentRecord, treatmentEffect: e.target.value })}
            />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={addTreatmentRecord}>Add Treatment Record</button>
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-2">Patient List</h2>
      <table className="w-full mb-6">
        <thead>
          <tr>
            <th className="text-left">Hospital Number</th>
            <th className="text-left">Name</th>
            <th className="text-left">Diagnosis</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.hospitalNumber}</td>
              <td>{patient.name}</td>
              <td>{patient.diagnosis}</td>
              <td>
                {(currentUser.role === 'super' || currentUser.role === 'admin') && (
                  <button className="text-blue-500 mr-2" onClick={() => startEditingPatient(patient)}>Edit</button>
                )}
                {currentUser.role === 'admin' && (
                  <button className="text-red-500" onClick={() => deletePatient(patient.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2 className="text-xl font-semibold mb-2">Treatment Records</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Patient</th>
            <th className="text-left">Treatment Plan</th>
            <th className="text-left">Treatment Date</th>
            <th className="text-left">Treatment Effect</th>
            {currentUser.role === 'admin' && <th className="text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {treatmentRecords.map(record => (
            <tr key={record.id}>
              <td>{patients.find(p => p.id === record.patientId)?.name}</td>
              <td>{record.treatmentPlan}</td>
              <td>{record.treatmentDate}</td>
              <td>{record.treatmentEffect}</td>
              {currentUser.role === 'admin' && (
                <td>
                  <button className="text-red-500" onClick={() => deleteTreatmentRecord(record.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;