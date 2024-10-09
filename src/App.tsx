import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import PatientManagement from './pages/PatientManagement';
import Statistics from './pages/Statistics';
import { User } from './types';

const queryClient = new QueryClient();

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {currentUser && <Header />}
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Login setCurrentUser={setCurrentUser} />} />
              <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/users" element={currentUser && currentUser.role === 'admin' ? <UserManagement currentUser={currentUser} /> : <Navigate to="/" />} />
              <Route path="/patients" element={currentUser ? <PatientManagement currentUser={currentUser} /> : <Navigate to="/" />} />
              <Route path="/statistics" element={currentUser ? <Statistics /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;