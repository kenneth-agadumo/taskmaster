// import React, { useState } from 'react';
// import DashboardSearch from '../components/DashboardSearch';
// import Projects from './Projects';
// import Tasks from './Tasks';

// const Dashboard: React.FC = () => {
//   const [filteredData, setFilteredData] = useState<{ projects: any[], tasks: any[] }>({ projects: [], tasks: [] });

//   const handleSearch = (query: string, filteredData: { projects: any[], tasks: any[] }) => {
//     setFilteredData(filteredData); // Update state with filtered projects and tasks
//     console.log(filteredData)
//   };

//   return (
//     <div>
//       <DashboardSearch onSearch={handleSearch} />
//       <Projects projects={filteredData.projects} /> {/* Display filtered projects */}
//       <Tasks tasks={filteredData.tasks} /> {/* Display filtered tasks */}
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSearch from "../components/DashboardSearch";
import { FaFolder, FaTasks } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";

import Tasks from "./Tasks";
import Projects from "./Projects";
import Calendar from "./Calendar";
import { getTasks, getProjects } from "../api";
import { Task, Project } from "../types";

// Define types for the `selectedTab`
type TabOption = "projects" | "tasks" | "calendar";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>("tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Fetch tasks and projects on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await getTasks();
        const fetchedProjects = await getProjects();
        setTasks(fetchedTasks);
        setProjects(fetchedProjects);
        setFilteredTasks(fetchedTasks); // Default filtered data
        setFilteredProjects(fetchedProjects); // Default filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    // Filter tasks and projects based on query
    if (!query) {
      setFilteredTasks(tasks);
      setFilteredProjects(projects);
    } else {
      const lowercasedQuery = query.toLowerCase();
      setFilteredTasks(
        tasks.filter((task) =>
          task.title?.toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredProjects(
        projects.filter((project) =>
          project.title?.toLowerCase().includes(lowercasedQuery)
        )
      );
      console.log(filteredTasks)
      console.log(filteredProjects)
    }
  };

  const handleTabChange = (tab: TabOption) => {
    setSelectedTab(tab);
  };

  return (
    <div className="bg-slate-100 flex flex-col" style={{ height: "100vh" }}>
      <header className="col-span-12 flex justify-end items-center py-7 pl-5 pr-9 h-2">
        <DashboardSearch onSearch={handleSearchChange} />
      </header>
      <div className="flex flex-row overflow-auto gap-2 h-full">
        <div className="bg-white basis-1/4 h-full p-3">
          <div className="bg-white h-full flex flex-col justify-between py-4">
            <div className="flex flex-col gap-2">
              <div
                className={`h-14 flex items-center gap-2 cursor-pointer rounded hover:bg-purp-light ${
                  selectedTab === "calendar" && "bg-purp-light"
                }`}
                onClick={() => handleTabChange("calendar")}
              >
                <div className={`${selectedTab === 'calendar' && 'w-1 h-14 mr-2  rounded relative top-0 left-0 bg-purple-950'}`}></div>

                <BiSolidDashboard
                  className={`${
                    selectedTab === "calendar" && "text-purple-950"
                  } size-5`}
                />
                <span
                  className={`hidden sm:block text-gray-600 font-medium ${
                    selectedTab === "calendar" && "text-purple-950"
                  }`}
                >
                  Dashboard
                </span>
              </div>
              <div
                className={`h-14 flex items-center gap-2 cursor-pointer rounded hover:bg-purp-light ${
                  selectedTab === "projects" && "bg-purp-light"
                }`}
                onClick={() => handleTabChange("projects")}
              >
                <div className={`${selectedTab === 'projects' && 'w-1 h-14 mr-2  rounded relative top-0 left-0 bg-purple-950'}`}></div>
                <FaFolder
                  className={`${
                    selectedTab === "projects" && "text-purple-950"
                  }`}
                />
                <span
                  className={`hidden sm:block text-gray-600 font-medium ${
                    selectedTab === "projects" && "text-purple-950"
                  }`}
                >
                  Projects
                </span>
              </div>
              <div
                className={`h-14 flex items-center gap-2 cursor-pointer rounded-sm hover:bg-purp-light ${
                  selectedTab === "tasks" && "bg-purp-light"
                }`}
                onClick={() => handleTabChange("tasks")}
              >
                <div className={`${selectedTab === 'tasks' && 'w-1 h-14 mr-2  rounded relative top-0 left-0 bg-purple-950'}`}></div>

                <FaTasks
                  className={`${
                    selectedTab === "tasks" && "text-purple-950"
                  }`}
                />
                <span
                  className={`hidden sm:block text-gray-600 font-medium ${
                    selectedTab === "tasks" && "text-purple-950"
                  }`}
                >
                  Tasks
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-auto p-6 h-full bg-white basis-3/4">
          {selectedTab === "projects" && <Projects />}
          {selectedTab === "tasks" && <Tasks  />}
          {selectedTab === "calendar" && <Calendar />}
        </div>
      </div>
    </div>
  );
};



export default Dashboard;
