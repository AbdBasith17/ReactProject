import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get('http://localhost:3000/users');
    setUsers(res.data);
  };

  const toggleActive = async (user) => {
    await axios.put(`http://localhost:3000/users/${user.id}`, {
      ...user,
      isActive: !user.isActive,
    });
    loadUsers();
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User Management</h1>

     
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full p-2 border rounded"
      />



      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded border border-gray-200 shadow mb-6 p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-700 font-semibold">
                Name: <span className="font-normal">{user.name}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Email: <span className="font-normal">{user.email}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Status:{' '}
                <span className="font-normal">
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
              <p className="text-gray-700 font-semibold">
                Orders: <span className="font-normal">{user.orders?.length || 0}</span>
              </p>
            </div>
            <button
              onClick={() => toggleActive(user)}
              className={`px-4 py-2 rounded text-white ${
                user.isActive ? 'bg-yellow-500' : 'bg-green-600'
              }`}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">No matching users found.</p>
      )}
    </div>
  );
}

export default Users;
