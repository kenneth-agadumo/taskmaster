import React from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const DashboardSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (String: e) => {
    const value = e.target.value;
    setSearchQuery(value); // Update local state
    onSearch(value); // Pass the search value to the parent component
  };
  return (
    <div className="search-bar-column hidden bg-white p-2 rounded w-80 flex items-center gap-2  lg:flex" >
    <FaSearch  className='text-gray-400' />
    <input className="search-input" type="text" value={searchQuery}
        onChange={(e) => handleInputChange(e)} placeholder="Search" />
  </div>
  
  )
}

export default DashboardSearch;