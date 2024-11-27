import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-xs p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold"></div>

        <div className="flex space-x-4">
          <div className="flex items-center border rounded-lg">
            <CiSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="p-1 text-black outline-none"
            />
          </div>
          <Link
            to="#"
            className="flex items-center text-black hover:hover:text-gray-500"
          >
            <span className="mr-1">Premium</span>
          </Link>
          <Link
            to="#"
            className="flex items-center text-white hover:text-white bg-black p-1 px-2 rounded-3xl"
          >
            <MdOutlineFileDownload className="mr-1" />
            <span className="text-xs">Get App</span>
          </Link>
          <Link
            to="#"
            className="flex items-center text-black hover:text-gray-500"
          >
            <IoIosNotifications className="mr-1 text-xl" />
          </Link>
          <Link
            to="#"
            className="flex items-center text-black hover:text-gray-500"
          >
            <FaCircleUser className="mr-1 text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
