import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { getProjects, getTasks } from '../api'; // Import your API functions

interface DashboardSearchProps {
  onSearch: (query: string, filteredData: { projects: any[], tasks: any[] }) => void;
}

const DashboardSearch: React.FC<DashboardSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // Update local state
    onSearch(value, { projects: [], tasks: [] }); // Pass initial empty arrays

    if (value) {
      try {
        const projects = await getProjects(); // Fetch all projects
        const tasks = await getTasks(); // Fetch all tasks

        const filteredProjects = projects.filter((project) =>
          project.name && project.name.toLowerCase().includes(value.toLowerCase())
        );
        const filteredTasks = tasks.filter((task) =>
          task.title && task.title.toLowerCase().includes(value.toLowerCase())
        );

        onSearch(value, { projects: filteredProjects, tasks: filteredTasks }); // Pass filtered data
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  return (
    <div className="search-bar-column hidden bg-white pl-3 rounded w-fit flex items-center gap-2 lg:flex">
      <FaSearch className='text-gray-400' />
      <input
        className="search-input w-72 p-2 focus:outline-none"
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search"
      />
    </div>
  );
};

export default DashboardSearch;
