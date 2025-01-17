// import React, { useState, useEffect } from "react";
// import { useGlobalContext } from "../contexts/GlobalContext";
// import { Task } from "../types";
// import { GoPlus } from "react-icons/go";
// import { TbUrgent } from "react-icons/tb";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { MdDelete } from "react-icons/md";
// import { RiEdit2Fill } from "react-icons/ri";
// import TaskForm from "../components/TaskForm";
// import { useDrag, useDrop } from "react-dnd";

// const Tasks: React.FC = () => {
//   const {
//     tasks,
//     fetchAllTasks,
//     handleSaveTask,
//     handleDeleteTask,
//     getTimeUntilEnd,
//   } = useGlobalContext();

//   const [showModal, setShowModal] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchAllTasks();
//   }, [fetchAllTasks]);

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//     setShowModal(true);
//   };

//   const toggleDropdown = (id: string) => {
//     setOpenDropdownId((prevId) => (prevId === id ? null : id));
//   };

//   const handleDelete = async (taskId: string) => {
//     await handleDeleteTask(taskId);
//   };

//   const moveTask = (draggedId: string, targetId: string) => {
//     const draggedTask = tasks.find((task) => task.id === draggedId);
//     const targetTask = tasks.find((task) => task.id === targetId);

//     if (draggedTask && targetTask) {
//       const updatedTasks = [...tasks];
//       const draggedIndex = updatedTasks.indexOf(draggedTask);
//       const targetIndex = updatedTasks.indexOf(targetTask);

//       // Swap the tasks
//       updatedTasks[draggedIndex] = targetTask;
//       updatedTasks[targetIndex] = draggedTask;

//       // Update the state with the new order
//       handleSaveTask(updatedTasks);
//     }
//   };

//   const TaskRow = ({ task }: { task: Task }) => {
//     const [, drag] = useDrag({
//       type: "TASK",
//       item: { id: task.id },
//     });

//     const [, drop] = useDrop({
//       accept: "TASK",
//       hover: (item: { id: string }) => {
//         if (item.id !== task.id) {
//           moveTask(item.id, task.id);
//         }
//       },
//     });

//     return (
//       <tr
//         ref={(node) => drag(drop(node))}
//         className="hover:bg-gray-50 cursor-pointer"
//       >
//         <td className="w-fit p-6 border-b border-gray-200 text-sm flex items-center">
//           <input type="checkbox" className="size-4 mr-2" />
//           {task.title}
//         </td>
//         <td className="p-6 border-b border-gray-200 text-gray-500 text-sm">
//           {task.category}
//         </td>
//         <td className="p-6 border-b border-gray-200 text-gray-500 text-sm">
//           <TbUrgent
//             className={`${
//               task.priority === "Urgent" ? "text-red-500" : "text-amber-500"
//             } size-5`}
//           />
//         </td>
//         <td className="p-6 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-sm">
//           {task.status}
//         </td>
//         <td className="p-6 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-sm">
//           {getTimeUntilEnd(task.endDate)}
//         </td>
//         <td className="p-6 border-b border-gray-200 text-gray-500 text-sm relative">
//           <HiOutlineDotsVertical
//             className="text-gray-700 size-4 cursor-pointer"
//             onClick={() => toggleDropdown(task.id)}
//           />
//           {openDropdownId === task.id && (
//             <div className="absolute mt-2 right-0 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//               <ul className="py-2">
//                 <li>
//                   <button
//                     className="w-full text-left px-4 py-2 text-sm flex gap-1 items-center hover:bg-gray-100 text-purple-700"
//                     onClick={() => handleEditTask(task)}
//                   >
//                     <RiEdit2Fill className="size-4 text-purple-700 cursor-pointer" />
//                     Edit
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     className="w-full text-left px-4 py-2 text-sm flex gap-1 items-center hover:bg-gray-100 text-red-500"
//                     onClick={() => handleDelete(task.id)}
//                   >
//                     <MdDelete className="size-4 text-red-500 cursor-pointer" />
//                     Delete
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <div>
//       <h2>Tasks</h2>
//       <div className="flex flex-row-reverse mb-2">
//         <button
//           onClick={() => {
//             setEditingTask(null);
//             setShowModal(true);
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold text-sm rounded-md shadow-md"
//         >
//           <GoPlus className="size-4" />
//           <span className="text-sm text-white">Add Task</span>
//         </button>
//       </div>
//       {tasks.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">
//           You haven't uploaded any tasks yet.
//         </p>
//       ) : (
//         <table className="min-w-full m-auto bg-white border shadow-md rounded-md table-auto">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-5 text-left text-gray-500 font-medium text-sm">
//                 Task Title
//               </th>
//               <th className="p-5 text-left text-gray-500 font-medium text-sm">
//                 Category
//               </th>
//               <th className="p-5 text-left text-gray-500 font-medium text-sm">
//                 Priority
//               </th>
//               <th className="p-5 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">
//                 Status
//               </th>
//               <th className="p-5 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">
//                 Timeline
//               </th>
//               <th className="p-5"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <TaskRow key={task.id} task={task} />
//             ))}
//           </tbody>
//         </table>
//       )}
//       {showModal && (
//         <TaskForm
//           onSave={(task) => (editingTask ? handleSaveTask(task) : handleSaveTask(task))}
//           onCancel={() => setShowModal(false)}
//           editingTask={editingTask}
//         />
//       )}
//     </div>
//   );
// };

// export default Tasks;
