import React, { useState } from "react";
import { Task, Project } from "../types";

interface SearchResultsProps {
  tasks: Task[];
  projects: Project[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ tasks, projects }) => {
  const [activeTab, setActiveTab] = useState<"tasks" | "projects">("tasks");

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded ${
            activeTab === "tasks" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded ${
            activeTab === "projects" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
        >
          Projects
        </button>
      </div>

      {activeTab === "tasks" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Tasks</h2>
        
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "projects" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-300 p-4 rounded shadow-sm"
              >
                <h3 className="font-bold mb-2">{project.title}</h3>
                <p>{project.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
