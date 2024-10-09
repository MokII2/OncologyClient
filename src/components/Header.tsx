import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users, Activity, BarChart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-6">
          <li>
            <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600">
              <User className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center text-gray-700 hover:text-blue-600">
              <Users className="w-5 h-5 mr-2" />
              User Management
            </Link>
          </li>
          <li>
            <Link to="/patients" className="flex items-center text-gray-700 hover:text-blue-600">
              <Activity className="w-5 h-5 mr-2" />
              Patient Management
            </Link>
          </li>
          <li>
            <Link to="/statistics" className="flex items-center text-gray-700 hover:text-blue-600">
              <BarChart className="w-5 h-5 mr-2" />
              Statistics
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;