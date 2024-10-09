import React, { useState } from 'react';
import { User } from '../types';

const UserManagement: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'normal_user', password: 'password123', role: 'normal' },
    { id: '2', username: 'super_user', password: 'password456', role: 'super' },
    { id: '3', username: 'admin_user', password: 'password789', role: 'admin' },
  ]);

  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'normal' as 'normal' | 'super' | 'admin' });

  const addUser = () => {
    if (currentUser.role === 'admin') {
      setUsers([...users, { ...newUser, id: String(users.length + 1) }]);
      setNewUser({ username: '', password: '', role: 'normal' });
    } else {
      alert('Only admin users can add new users.');
    }
  };

  const deleteUser = (id: string) => {
    if (currentUser.role === 'admin') {
      setUsers(users.filter(user => user.id !== id));
    } else {
      alert('Only admin users can delete users.');
    }
  };

  if (currentUser.role !== 'admin') {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mr-2"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mr-2"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="border p-2 mr-2"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'normal' | 'super' | 'admin' })}
        >
          <option value="normal">Normal User</option>
          <option value="super">Super User</option>
          <option value="admin">Admin User</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addUser}>Add User</button>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">User List</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Username</th>
            <th className="text-left">Role</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className="text-red-500" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;