import { FaLongArrowAltLeft } from "react-icons/fa";
import Sidebar from "../sidebar/Sidebar";
import Player from "../player/Player";
import Calandar from "../Calendar";

const Header = () => {
  return (
    <div>
      {" "}
      <div className="flex h-screen bg-gray-50 text-white">
        <Sidebar />

        <div className="flex-1 p-4">
          <h2 className="text-xs mb-8 text-gray-300 flex items-center">
            <FaLongArrowAltLeft className="mr-2" /> Back to Library
          </h2>

          <div className="flex gap-1 mb-6 text-xs">
            <button className="px-4 py-2 bg-yellow-400 rounded-full text-black">
              All
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-full">
              Listening
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-full">
              Learning
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-full">
              Rehearsal
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-full">
              Perform
            </button>
          </div>

          <Calandar />
        </div>
      </div>
      {/* <Player /> */}
    </div>
  );
};

export default Header;
