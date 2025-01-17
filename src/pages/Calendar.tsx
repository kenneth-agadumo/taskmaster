import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Calendar: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", category: "Category 1", priority: "High" },
    { id: 2, title: "Task 2", category: "Category 2", priority: "Medium" },
    { id: 3, title: "Task 3", category: "Category 3", priority: "Low" },
  ]);

  const moveTask = (draggedId: number, targetId: number) => {
    const draggedTask = tasks.find(task => task.id === draggedId);
    const targetTask = tasks.find(task => task.id === targetId);

    if (draggedTask && targetTask) {
      const updatedTasks = [...tasks];
      const draggedIndex = updatedTasks.indexOf(draggedTask);
      const targetIndex = updatedTasks.indexOf(targetTask);

      // Swap the tasks
      updatedTasks[draggedIndex] = targetTask;
      updatedTasks[targetIndex] = draggedTask;

      setTasks(updatedTasks);
    }
  };

  const TaskRow = ({ task }: { task: any }) => {
    const [, drag] = useDrag({
      type: "TASK",
      item: { id: task.id },
    });

    const [, drop] = useDrop({
      accept: "TASK",
      hover: (item: { id: number }) => {
        if (item.id !== task.id) {
          moveTask(item.id, task.id);
        }
      },
    });

    return (
      <tr ref={(node) => drag(drop(node))} className="hover:bg-gray-50 cursor-pointer">
        <td className="p-5 text-left text-gray-500 font-medium text-sm">{task.title}</td>
        <td className="p-5 text-left text-gray-500 font-medium text-sm">{task.category}</td>
        <td className="p-5 text-left text-gray-500 font-medium text-sm">{task.priority}</td>
        <td className="p-5 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">Status</td>
        <td className="p-5 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">Timeline</td>
        <td className="p-5"></td>
      </tr>
    );
  };

  return (
    <table className="min-w-full m-auto bg-white border shadow-md rounded-md table-auto">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-5 text-left text-gray-500 font-medium text-sm">Task Title</th>
          <th className="p-5 text-left text-gray-500 font-medium text-sm">Category</th>
          <th className="p-5 text-left text-gray-500 font-medium text-sm">Priority</th>
          <th className="p-5 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">Status</th>
          <th className="p-5 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">Timeline</th>
          <th className="p-5"></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
