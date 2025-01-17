
import { Task } from "../types";
import { TbUrgent } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import DropdownComponent from "./Dropdown";
import { useState } from "react";

interface TaskTableProps {
  tasks: Task[];
  getTimeUntilEnd: (endDate: string) => string;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;

}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  getTimeUntilEnd,
  onEditTask,
  onDeleteTask,
 
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };


 

  return (
    <>
       <div className="flex flex-row-reverse mb-3">
          <button
            // onClick={() => {
            //   setEditingTask(null);
            //   setShowModal(true);
            // }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-500 border border-purple-500 hover:bg-purple-50 font-semibold text-sm rounded-md "
          >
            <IoFilter className="size-4" />
            <span className="text-sm ">Filter</span>
          </button>
        </div>
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
        {tasks
          ?.filter((task) => task !== null && task !== undefined)
          .map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="w-fit p-6 border-b border-gray-200 text-sm flex items-center">
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
              <td className="p-6 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-sm">
                <DropdownComponent selectedStatus={task.status} task={task} />
              </td>
              <td className="p-6 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-sm">
                {getTimeUntilEnd(task.endDate)}
              </td>
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
                          onClick={() => onEditTask(task)}
                        >
                          <RiEdit2Fill className="size-4 text-purple-700 cursor-pointer" />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 text-sm flex gap-1 items-center hover:bg-gray-100 text-red-500"
                          onClick={() => onDeleteTask(task.id)}
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
    </>
    
  );
};

export default TaskTable;
