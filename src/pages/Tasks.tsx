import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Task } from "../types";
import { GoPlus } from "react-icons/go";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating IDs if needed

const Tasks: React.FC = () => {
  const {
    tasks,
    fetchAllTasks,
    handleSaveTask,
    handleDeleteTask,
    getTimeUntilEnd,
  } = useGlobalContext();

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = async (taskId: string) => {
    await handleDeleteTask(taskId);
  };

  const handleSave = (task: Task | Omit<Task, "id">) => {
    // Ensure the task has an `id`
    const taskWithId: Task = {
      ...task,
      id: editingTask ? editingTask.id : uuidv4(), // Use existing id if editing, else generate a new one
    };

    handleSaveTask(taskWithId); // Call the original save function
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">You haven't uploaded any tasks yet.</p>
      ) : (
        <TaskTable
          tasks={tasks}
          getTimeUntilEnd={getTimeUntilEnd}
          onEditTask={handleEditTask}
          onDeleteTask={handleDelete}
        />
      )}
      <div className="flex flex-row-reverse my-3">
        <button
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold text-sm rounded-md shadow-md"
        >
          <GoPlus className="size-5" />
          <span className="text-sm text-white">Add Task</span>
        </button>
      </div>
      {showModal && (
        <TaskForm
          onSave={handleSave} // Update the onSave prop to call handleSave
          onCancel={() => setShowModal(false)}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default Tasks;
