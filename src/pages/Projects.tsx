import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Task, Project } from "../types";
import TaskForm from "../components/TaskForm";
import { IoArrowBack } from "react-icons/io5";
import { TbUrgent } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const Projects: React.FC = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("GlobalContext not found");
  }

  const {
    projects,
    removeTaskFromProject,
    updateTaskInProject,
    fetchAllProjects,
    addTaskToProject,
    getTimeUntilEnd,
  } = context;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const handleRemoveTask = async (projectId: number, taskId: number) => {
    try {
      await removeTaskFromProject(projectId, taskId);

      if (selectedProject) {
        const updatedTasks = selectedProject.tasks.filter((task) => task.id !== taskId);
        setSelectedProject({ ...selectedProject, tasks: updatedTasks });
      }

      console.log("Task removed successfully");
    } catch (error) {
      console.error("Error removing task from project:", error);
    }
  };

  const handleUpdateTask = async (projectId: number, updatedTask: Task) => {
    try {
      await updateTaskInProject(projectId, updatedTask);

      if (selectedProject) {
        const updatedTasks = selectedProject.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setSelectedProject({ ...selectedProject, tasks: updatedTasks });
      }

      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task in project:", error);
    }
  };

  const handleAddTask = async (projectId: number, newTask: Task) => {
    try {
      await addTaskToProject(projectId, newTask);

      if (selectedProject) {
        const updatedTasks = [...selectedProject.tasks, newTask];
        setSelectedProject({ ...selectedProject, tasks: updatedTasks });
      }

      console.log("Task added successfully");
    } catch (error) {
      console.error("Error adding task to project:", error);
    }
  };

  const handleBack = () => {
    setSelectedProject(null);
    setShowTaskForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {!selectedProject ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p>{project.tasks.length} tasks</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-3 py-2 rounded mb-4 hover:bg-gray-100"
          >
            <IoArrowBack />
            Back
          </button>
          <h3 className="text-xl font-bold mb-4">{selectedProject.title}</h3>

          <div>
            <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-5 text-gray-500 font-medium text-sm text-left">Task Title</th>
                  <th className="p-5 text-gray-500 font-medium text-sm text-left">Category</th>
                  <th className="p-5 text-gray-500 font-medium text-sm text-left">Priority</th>
                  <th className="p-5 text-gray-500 hidden sm:table-cell font-medium text-sm text-left">Status</th>
                  <th className="p-5 text-gray-500 hidden sm:table-cell font-medium text-sm text-left">Timeline</th>
                  <th className="p-5 text-gray-500 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {selectedProject.tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="flex items-center p-6 border-b border-gray-200 text-sm">
                      <input type="checkbox" className="size-4 mr-2" />
                      {task.title}
                    </td>
                    <td className="p-6 border-b border-gray-200 text-gray-500 text-sm">{task.category}</td>
                    <td className="p-6 border-b border-gray-200 text-gray-500 text-sm">
                      <TbUrgent
                        className={`${
                          task.priority === "Urgent" ? "text-red-500" : "text-amber-500"
                        } size-5`}
                      />
                    </td>
                    <td className="p-4">{task.status}</td>
                    <td className="p-4">{getTimeUntilEnd(task.endDate)}</td>
                    <td className="p-6 border-b border-gray-200 text-gray-500 text-sm relative">
                      <HiOutlineDotsVertical
                        className="text-gray-700 size-4 cursor-pointer"
                        onClick={() => toggleDropdown(task.id)}
                      />
                      {openDropdownId === task.id && (
                        <div className="absolute mt-2 right-0 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <ul className="py-2">
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 text-sm flex gap-1 items-center hover:bg-gray-100 text-purple-700"
                                onClick={() => handleEditTask(task)}
                              >
                                <RiEdit2Fill className="size-4 text-purple-700 cursor-pointer" />
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 text-sm flex gap-1 items-center hover:bg-gray-100 text-red-500"
                                onClick={() => handleRemoveTask(selectedProject.id, task.id)}
                              >
                                <MdDelete className="size-4 text-red-500 cursor-pointer" />
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setShowTaskForm(true)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>

          {showTaskForm && (
            <TaskForm
              onSave={(task) =>
                editingTask
                  ? handleUpdateTask(selectedProject!.id, task)
                  : handleAddTask(selectedProject!.id, task)
              }
              onCancel={() => setShowTaskForm(false)}
              editingTask={editingTask}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
