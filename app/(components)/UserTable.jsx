"use client";
import React, { useState, useEffect } from 'react';
import { EllipsisIcon } from 'lucide-react';
const initialUsers = [
  { name: 'Florence Shaw', email: 'florence@untitledui.com', access: ['Admin', 'Data Export', 'Data Import'], lastActive: 'Mar 4, 2024', dateAdded: 'July 4, 2022' },
  { name: 'Amélie Laurent', email: 'amelie@untitledui.com', access: ['Admin', 'Data Export', 'Data Import'], lastActive: 'Mar 4, 2024', dateAdded: 'July 4, 2022' },
  { name: 'Ammar Foley', email: 'ammar@untitledui.com', access: ['Data Export', 'Data Import'], lastActive: 'Mar 2, 2024', dateAdded: 'July 4, 2022' },
  // Add more users as needed
];

const UserTable = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [theme, setTheme] = useState('light'); // Added state for theme

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleCheckboxChange = (email) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((selectedEmail) => selectedEmail !== email)
        : [...prevSelected, email]
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
    const matchesFilter = filter ? user.access.includes(filter) : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`container mx-auto p-4 dark:bg-gray-800 dark:text-white bg-white text-gray-900`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className={`p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-gray-100 text-gray-800 border-gray-300`}
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className={`p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-gray-100 text-gray-900 border-gray-300`}
          >
            <option value="">Filter by Access</option>
            <option value="Admin">Admin</option>
            <option value="Data Export">Data Export</option>
            <option value="Data Import">Data Import</option>
          </select>
        </div>
        <button className="border dark:border-white border-slate-800 dark:text-white px-4 py-2 rounded hover:bg-slate-500 hover:text-black transition-colors">
        + Add User
        </button>
      </div>

      <table className={`min-w-full shadow-md rounded-lg dark:bg-slate-800 bg-background  mt-16`}>
        <thead >
          <tr className="dark:text-slate-400 text-gray-700 text-small border-b dark:border-gray-700 border-gray-300" >
            <th className="py-3 px-6 text-left ">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedUsers(e.target.checked ? users.map((user) => user.email) : [])
                }
                checked={selectedUsers.length === users.length}
                className="dark:text-white text-gray-800"
              />
            </th>
            <th className="py-3 px-6 text-left">User Name</th>
            <th className="py-3 px-6 text-left">Access</th>
            <th className="py-3 px-6 text-left">Last Active</th>
            <th className="py-3 px-6 text-left">Date Added</th>
            <th className="py-3 px-6 text-left"></th>
          </tr>
        </thead>
        <tbody className='text-small'>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="border-b dark:border-gray-700 border-gray-300">
              <td className="py-2 px-6">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.email)}
                  onChange={() => handleCheckboxChange(user.email)}
                  className="dark:text-slate-300 text-gray-900"
                />
              </td>
              <td className="py-2 px-6">
                {user.name}
                <br />
                <span className="text-sm dark:text-gray-400 text-gray-500">{user.email}</span>
              </td>
              <td className="py-2 px-6">
                {user.access.map((role, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold inline-block py-1 px-2 rounded text-white  bg-slate-500 last:mr-0 mr-1"
                  >
                    {role}
                  </span>
                ))}
              </td>
              <td className="py-2 px-6">{user.lastActive}</td>
              <td className="py-2 px-6">{user.dateAdded}</td>
              <td><EllipsisIcon/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserTable;
