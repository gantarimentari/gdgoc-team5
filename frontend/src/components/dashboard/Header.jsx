'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SearchIcon, ChevronDownIcon } from '@/components/icons';

// Data dummy - nanti akan diganti dengan data dari API
const DUMMY_USER_DATA = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  
  avatar: null, // URL avatar jika ada
};

const Header = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(DUMMY_USER_DATA);
  const [loading, setLoading] = useState(false);


useEffect(() => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    setUserData(prev => ({
      ...prev,
      name: savedName // Mengganti John Doe dengan nama asli dari login
    }));
  }
}, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Hapus semua data dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    
    // Redirect ke halaman login
    router.push('/auth/login');
    
    // Optional: Tampilkan notifikasi
    alert('Logout berhasil!');
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end gap-6">
        {/* Search Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded-lg transition-colors">
            <SearchIcon className="text-gray-100" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center gap-3 hover:bg-gray-50 bg-gray-100 rounded-4xl px-3 py-2 transition-colors"
            >
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                {userData.avatar ? (
                  <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-gray-700">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* User Name */}
              <span className="text-sm font-bold text-gray-700">
                {userData.name.split(' ')[0]}
              </span>
              
              {/* Dropdown Arrow */}
              <ChevronDownIcon />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
