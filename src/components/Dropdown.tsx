import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

interface DropdownComponentProps {
  selectedStatus: string; // The current status value
  task: { id: string }; // Task object with at least the ID property
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ selectedStatus, task }) => {
  const [currentStatus, setCurrentStatus] = useState(selectedStatus);
  const { updateTaskStatus } = useGlobalContext(); // Access the global context function

  useEffect(() => {
    setCurrentStatus(selectedStatus); // Sync the status when the prop changes
  }, [selectedStatus]);

  // Function to handle the change of selection
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setCurrentStatus(newStatus);
    await updateTaskStatus(task.id, newStatus); // Update the task's status in the database
  };

  // Determine the color class based on the selected status
  const getColorClass = () => {
    switch (currentStatus) {
      case "Not Started":
        return "bg-red-600";
      case "In Progress":
        return "bg-amber-400";
      case "Completed":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div>
      <select
        value={currentStatus}
        onChange={handleChange}
        className={`p-1 rounded-xl text-white ${getColorClass()}`}
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default DropdownComponent;
