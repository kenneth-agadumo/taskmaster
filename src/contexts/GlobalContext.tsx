import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Task, Project } from "../types"; // Import the types
import {
  getTasks,
  getProjects,
  getProjectTasks,
  addTask,
  updateTask,
  deleteTask,
  addProject,
  updateProject,
  deleteProject,
  addTaskToProject,
  removeTaskFromProject,
  updateTaskInProject, // Import update task in project function
} from "../api";

interface GlobalContextProps {
  tasks: Task[];
  projects: Project[];

  getTimeUntilEnd: (endDate: string) => string;
  fetchAllTasks: () => Promise<void>;
  fetchAllProjects: () => Promise<void>;
  handleSaveTask: (task: Task) => Promise<void>;
  handleDeleteTask: (id: number) => Promise<void>;
  handleSaveProject: (project: Project) => Promise<void>;
  handleDeleteProject: (id: number) => Promise<void>;
  addTaskToProject: (projectId: number, task: Task) => Promise<void>;
  removeTaskFromProject: (projectId: number, taskId: number) => Promise<void>;
  updateTaskInProject: (projectId: number, task: Task) => Promise<void>; // Add the updateTaskInProject function here
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Calculate timeline
  const getTimeUntilEnd = (endDate: string): string => {
    const today = new Date();
    const end = new Date(endDate);
    if (isNaN(end.getTime())) return "Invalid date";

    const diffInMs = end.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays > 0
      ? `${diffInDays} day${diffInDays !== 1 ? "s" : ""} left`
      : diffInDays === 0
      ? "Ends today"
      : `${Math.abs(diffInDays)} day${Math.abs(diffInDays) !== 1 ? "s" : ""} overdue`;
  };

  // Fetch all tasks
  const fetchAllTasks = async () => {
    const [generalTasks, projectTasks] = await Promise.all([getTasks(), getProjectTasks()]);
    setTasks([...generalTasks, ...projectTasks]);
  };

  // Fetch all projects
  const fetchAllProjects = async () => {
    const allProjects = await getProjects();
    setProjects(allProjects);
  };

  // Save or update a task
  const handleSaveTask = async (task: Task) => {
    if (task.id) {
      const updatedTask = await updateTask(task);
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } else {
      const addedTask = await addTask(task);
      setTasks((prev) => [...prev, addedTask]);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id)); // Remove the task from the state
  };

  // Save or update a project
  const handleSaveProject = async (project: Project) => {
    if (project.id) {
      const updatedProject = await updateProject(project);
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    } else {
      const addedProject = await addProject(project);
      setProjects((prev) => [...prev, addedProject]);
    }
  };

  // Delete a project
  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((project) => project.id !== id)); // Remove the project from the state
  };

  // Add a task to a project
  const handleAddTaskToProject = async (projectId: number, task: Task) => {
    const updatedProject = await addTaskToProject(projectId, task);
    setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  // Remove a task from a project
  const handleRemoveTaskFromProject = async (projectId: number, taskId: number) => {
    const updatedProject = await removeTaskFromProject(projectId, taskId);
    setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  // Update task in project
  const handleUpdateTaskInProject = async (projectId: number, task: Task) => {
    const updatedProject = await updateTaskInProject(projectId, task); // Update the task in the project
    setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))); // Update the project state
  };

  useEffect(() => {
    fetchAllTasks();
    fetchAllProjects();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        projects,setProjects,
        getTimeUntilEnd,
        fetchAllTasks,
        fetchAllProjects,
        handleSaveTask,
        handleDeleteTask,
        handleSaveProject,
        handleDeleteProject,
        addTaskToProject: handleAddTaskToProject,
        removeTaskFromProject: handleRemoveTaskFromProject,
        updateTaskInProject: handleUpdateTaskInProject, // Add handleUpdateTaskInProject to the context
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
