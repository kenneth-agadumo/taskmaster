import axios from "axios";
import { Project, Task } from "./types";

const BASE_URL = "http://localhost:5000";

// API endpoint URLs
const PROJECTS_API = `${BASE_URL}/projects`;
const TASKS_API = `${BASE_URL}/tasks`;

// ====== Projects CRUD Operations ======

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(PROJECTS_API);
  return response.data;
};

// Get a single project by ID
export const getProjectById = async (id: string): Promise<Project> => {
  const response = await axios.get<Project>(`${PROJECTS_API}/${id}`);
  return response.data;
};

// Create a new project
export const addProject = async (newProject: Omit<Project, "id">): Promise<Project> => {
  const response = await axios.post<Project>(PROJECTS_API, newProject);
  return response.data;
};

// Update an existing project
export const updateProject = async (updatedProject: Project): Promise<Project> => {
  const response = await axios.put<Project>(`${PROJECTS_API}/${updatedProject.id}`, updatedProject);
  return response.data;
};

// Delete a project by ID
export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`${PROJECTS_API}/${id}`);
};

// ====== Tasks within a Project ======

// Get all tasks from projects
export const getProjectTasks = async (): Promise<Task[]> => {
  const projects = await getProjects(); // Fetch all projects
  const allProjectTasks = projects.flatMap((project) => project.tasks); // Extract tasks from all projects
  return allProjectTasks;
};

// Add a new task to a project
export const addTaskToProject = async (projectId: string, newTask: Task): Promise<Project> => {
  const project = await getProjectById(projectId);
  const updatedProject = {
    ...project,
    tasks: [...project.tasks, newTask],
  };
  return updateProject(updatedProject);
};

// Remove a task from a project
export const removeTaskFromProject = async (projectId: string, taskId: string): Promise<Project> => {
  const project = await getProjectById(projectId);
  const updatedProject = {
    ...project,
    tasks: project.tasks.filter((task: Task) => task.id !== taskId),
  };
  return updateProject(updatedProject);
};


// ====== Taskss CRUD Operations ======

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(TASKS_API);
  return response.data;
};

// Add a task
export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post<Task>(TASKS_API, task);
  return response.data;
};

// Update a Task
export const updateTask = async (task: Task): Promise<Task> => {
  const url = task.projectId
    ? `${TASKS_API}/${task.id}?projectId=${task.projectId}` // Assuming the task has a projectId field
    : `${TASKS_API}/${task.id}`;
  const response = await axios.put<Task>(url, task);
  return response.data;
};

//  Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${TASKS_API}/${id}`);
};


// Update task within a project
export const updateTaskInProject = async (projectId: string, updatedTask: Task): Promise<Project> => {
  // Fetch the project by ID
  const project = await getProjectById(projectId);

  // Update the task in the project's task list
  const updatedTasks = project.tasks.map((task: Task) =>
    task.id === updatedTask.id ? { ...task, ...updatedTask } : task // Update the task in the project
  );

  // Create the updated project
  const updatedProject = { ...project, tasks: updatedTasks };

  // Update the project with the new task list
  const projectAfterUpdate = await updateProject(updatedProject);

  // Update the task in the task collection
  await updateTask(updatedTask);

  // Return the updated project
  return projectAfterUpdate;
};
