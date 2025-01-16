import React, { useState, useEffect } from "react";
import { Task } from "../types";

interface TaskFormProps {
  onSave: (task: Omit<Task, "id"> | Task) => void;
  onCancel: () => void;
  editingTask?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onCancel, editingTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [isUrgent, setIsUrgent] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setNewTaskTitle(editingTask.title);
      setCategory(editingTask.category);
      setIsUrgent(editingTask.priority === "Urgent");
      setStartDate(editingTask.startDate);
      setEndDate(editingTask.endDate);
    } else {
      // Reset form if no editing task is provided
      setNewTaskTitle("");
      setCategory("Personal");
      setIsUrgent(false);
      setStartDate("");
      setEndDate("");
    }
  }, [editingTask]);

  const handleSave = () => {
    if (!newTaskTitle) return;

    const task: Omit<Task, "id"> | Task = {
      ...editingTask,
      title: newTaskTitle,
      category,
      priority: isUrgent ? "Urgent" : "Medium",
      startDate,
      endDate,
    };
    onSave(task);
    onCancel()
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <div className="mb-4">
          <label className="block font-semibold mb-2">Category</label>
          <div className="flex items-center gap-4">
            <label>
              <input
                type="radio"
                value="Personal"
                checked={category === "Personal"}
                onChange={() => setCategory("Personal")}
                className="mr-2"
              />
              Personal
            </label>
            <label>
              <input
                type="radio"
                value="Work"
                checked={category === "Work"}
                onChange={() => setCategory("Work")}
                className="mr-2"
              />
              Work
            </label>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="mr-4 font-semibold">Urgent</label>
          <button
            onClick={() => setIsUrgent(!isUrgent)}
            className={`w-12 h-6 rounded-full ${
              isUrgent ? "bg-red-500" : "bg-gray-300"
            } flex items-center px-1 py-3`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform ${
                isUrgent ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-md"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
