import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";



const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full"
      >
        <HiOutlineDotsVertical className="text-gray-700 size-1"  />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => alert("Action 1 clicked")}
              >
                Action 1
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => alert("Action 2 clicked")}
              >
                Action 2
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => alert("Action 3 clicked")}
              >
                Action 3
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
