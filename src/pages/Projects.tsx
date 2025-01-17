import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Task, Project } from "../types";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import { IoArrowBack } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator (if you want to use unique ids)

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
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const handleBack = () => {
    setSelectedProject(null);
    setShowTaskForm(false);
  };

  const handleAddTask = async (projectId: string, newTask: Task) => {
    await addTaskToProject(projectId, newTask);
    setSelectedProject({
      ...selectedProject!,
      tasks: [...selectedProject!.tasks, newTask],
    });
  };

  const handleUpdateTask = async (projectId: string, updatedTask: Task) => {
    await updateTaskInProject(projectId, updatedTask);
    setSelectedProject({
      ...selectedProject!,
      tasks: selectedProject!.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    });
  };

  const handleRemoveTask = async (taskId: string) => {
    if (!selectedProject) return;
    await removeTaskFromProject(selectedProject.id, taskId);
    setSelectedProject({
      ...selectedProject,
      tasks: selectedProject.tasks.filter((task) => task.id !== taskId),
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {!selectedProject ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p>{project.tasks.length} tasks</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-3 py-2 rounded mb-4 hover:bg-gray-100"
          >
            <IoArrowBack /> Back
          </button>
          <h3 className="text-xl font-bold mb-4">{selectedProject.title}</h3>
          <TaskTable
            tasks={selectedProject.tasks}
            getTimeUntilEnd={getTimeUntilEnd}
            onEditTask={(task) => {
              setEditingTask(task);
              setShowTaskForm(true);
            }}
            onDeleteTask={handleRemoveTask}
            
          />

          <div className="flex flex-row-reverse my-3">
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold text-sm rounded-md shadow-md"
              >
                <GoPlus className="size-5" />
                <span className="text-sm text-white">Add Task</span>
              </button>
          </div>
         
          {showTaskForm && (
         

          <TaskForm
            onSave={(task) => {
              // Ensure the task has an 'id' when adding or updating
              const taskWithId: Task = {
                ...task,
                id: editingTask ? editingTask.id : uuidv4(), // Use existing id if editing, otherwise generate a new one
              };
          
              // Add or update task based on whether it's an editing task
              editingTask
                ? handleUpdateTask(selectedProject!.id, taskWithId)
                : handleAddTask(selectedProject!.id, taskWithId);
            }}
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
