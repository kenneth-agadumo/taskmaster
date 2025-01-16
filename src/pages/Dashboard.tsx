// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSearch from '../components/DashboardSearch';
import { FaFolder, FaTasks } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

import { BiSolidDashboard } from "react-icons/bi";


import Tasks from './Tasks';
import Projects from './Projects';
import Calendar from './Calendar';

// Define types for the `selectedTab`
type TabOption = 'projects' | 'tasks' | 'calendar' ;

const Dashboard: React.FC = () => {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<TabOption>('tasks'); // Default tab is 'projects'

  // Handle tab change
  const handleTabChange = (tab: TabOption) => {
    setSelectedTab(tab);
  };

  // Fetch active user data on component mount (if needed in the future)
  useEffect(() => {
    // Placeholder for fetching data
  }, []);

  return (
    <div className="bg-slate-100 flex flex-col" style={{ height: '100vh' }}>
      {/* Dashboard Header */}
      <header className="col-span-12 flex justify-end items-center py-7 pl-5 pr-9 h-2">
        <DashboardSearch onSearch={''} />
      </header>

      <div className="flex flex-row overflow-auto gap-2 h-full">
        {/* Sidebar Navigation */}
        <div className="bg-white basis-1/4 h-full p-3">
          <div className="bg-white h-full flex flex-col justify-between py-4">
            {/* Navigation Items */}
            <div className="flex flex-col gap-2">
            <div
                className={`h-14 flex items-center gap-2 cursor-pointer rounded hover:bg-purp-light ${selectedTab === 'calendar' && 'bg-purp-light'}`}
                onClick={() => handleTabChange('calendar')}
              >
                <div className={`${selectedTab === 'calendar' && 'w-1 h-14 mr-2  rounded relative top-0 left-0 bg-purple-950'}`}></div>
                <BiSolidDashboard className={`${selectedTab === 'calendar' && 'text-purple-950'} size-5`} />
                <span className={`hidden sm:block text-gray-600 font-medium ${selectedTab === 'calendar' && 'text-purple-950'}`}>
                  Dashboard
                </span>
              </div>
              <div
                className={`h-14 flex items-center gap-2 cursor-pointer rounded hover:bg-purp-light ${selectedTab === 'projects' && 'bg-purp-light'}`}
                onClick={() => handleTabChange('projects')}
              >
                <div className={`${selectedTab === 'projects' && 'w-1 h-14 mr-2 rounded-sm relative top-0 left-0 bg-purple-950'}`}></div>
                <FaFolder className={`${selectedTab === 'projects' && 'text-purple-950'}`} />
                <span className={`hidden sm:block text-gray-600 font-medium ${selectedTab === 'projects' && 'text-purple-950'}`}>
                  Projects
                </span>
              </div>
              <div
                className={` h-14 flex items-center gap-2 cursor-pointer rounded-sm hover:bg-purp-light ${selectedTab === 'tasks' && 'bg-purp-light'}`}
                onClick={() => handleTabChange('tasks')}
              >
                <div className={`${selectedTab === 'tasks' && 'w-1 h-14 mr-2  rounded-sm relative top-0 left-0 bg-purple-950'}`}></div>
                <FaTasks className={`${selectedTab === 'tasks' && 'text-purple-950'} `} />
                <span className={`hidden sm:block text-gray-600 font-medium ${selectedTab === 'tasks' && 'text-purple-950'}`}>
                  Tasks
                </span>
              </div>
             
            </div>

           
          </div>
        </div>

        {/* Main Content Section */}
        <div className="overflow-auto p-6 h-full bg-white basis-3/4">
          

          {/* Render content based on selected tab */}
          {selectedTab === 'projects' && <Projects />}
          {selectedTab === 'tasks' && <Tasks />}
          {selectedTab === 'calendar' && <Calendar />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
