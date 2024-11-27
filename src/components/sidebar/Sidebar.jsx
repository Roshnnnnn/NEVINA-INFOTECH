import {
  FaHome,
  FaUser,
  FaBook,
  FaFolder,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { MdAudiotrack, MdSpatialTracking } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiAlbumLine } from "react-icons/ri";
import { FcCompactCamera } from "react-icons/fc";
import { ImEarth } from "react-icons/im";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(null);

  const toggleCollection = () => {
    setIsCollectionOpen(!isCollectionOpen);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="h-auto max-h-screen overflow-y-auto w-60 text-xs bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pl-4 pt-8 text-black md:block lg:hidden"
      >
        <FaBars className="text-black" />
      </button>
      <div
        className={`pl-4 flex flex-col w-56 text-black ${
          isOpen ? "block" : "hidden"
        } flex md:block`}
      >
        <div className="p-6">
          {/* <h1 className="text-sm font-bold lg:block">Sidebar</h1> */}
        </div>
        <nav className="flex flex-col space-y-1 ">
          <Link
            to="#"
            onClick={() => handleItemClick("home")}
            className={`flex items-center p-3 text-sm hover:bg-yellow-50 hover:text-yellow-500 rounded-md transition duration-200 ${
              activeItem === "home" ? "bg-yellow-500 text-white" : ""
            }`}
          >
            <FaHome
              className={`mr-2 ${activeItem === "home" ? "text-white" : ""}`}
            />{" "}
            Home
          </Link>
          <Link
            to="#"
            onClick={() => handleItemClick("profile")}
            className={`flex items-center p-3 text-sm hover:bg-yellow-50 hover:text-yellow-500 rounded-md transition duration-200 ${
              activeItem === "profile" ? "bg-yellow-500 text-white" : ""
            }`}
          >
            <FaUser
              className={`mr-2 ${activeItem === "profile" ? "text-white" : ""}`}
            />{" "}
            Profile
          </Link>
          <Link
            to="#"
            onClick={() => handleItemClick("library")}
            className={`flex items-center p-3 text-sm hover:bg-yellow-50 hover:text-yellow-500 rounded-md transition duration-200 ${
              activeItem === "library" ? "bg-yellow-500 text-white" : ""
            }`}
          >
            <FaBook
              className={`mr-2 ${activeItem === "library" ? "text-white" : ""}`}
            />{" "}
            Library
          </Link>
          <div className="flex flex-col text-sm">
            <button
              onClick={() => {
                toggleCollection();
                handleItemClick("collection");
              }}
              className={`flex items-center p-3 hover:bg-yellow-50 hover:text-yellow-500 rounded-md transition duration-200 ${
                activeItem === "collection" ? "text-yellow-500" : ""
              }`}
            >
              <FaFolder
                className={`mr-2 ${
                  activeItem === "collection" ? "text-yellow-500" : ""
                }`}
              />{" "}
              Collection
              {isCollectionOpen ? (
                <FaChevronUp
                  className={`ml-auto ${
                    activeItem === "collection" ? "text-yellow-500" : ""
                  }`}
                />
              ) : (
                <FaChevronDown
                  className={`ml-auto ${
                    activeItem === "collection" ? "text-yellow-500" : ""
                  }`}
                />
              )}
            </button>
            {isCollectionOpen && (
              <div className="ml-4 space-y-1">
                <Link
                  to="#"
                  onClick={() => handleItemClick("playlist")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "playlist" ? "text-yellow-500" : ""
                  }`}
                >
                  <BiSolidPlaylist
                    className={`mr-2 ${
                      activeItem === "playlist" ? "text-yellow-500" : ""
                    }`}
                  />
                  Playlist
                </Link>
                <Link
                  to="#"
                  onClick={() => handleItemClick("tracks")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "tracks" ? "text-yellow-500" : ""
                  }`}
                >
                  <MdAudiotrack
                    className={`mr-2 ${
                      activeItem === "tracks" ? "text-yellow-500" : ""
                    }`}
                  />
                  Tracks
                </Link>
                <Link
                  to="#"
                  onClick={() => handleItemClick("artists")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "artists" ? "text-yellow-500" : ""
                  }`}
                >
                  <CiMicrophoneOn
                    className={`mr-2 ${
                      activeItem === "artists" ? "text-yellow-500" : ""
                    }`}
                  />
                  Artists
                </Link>
                <Link
                  to="#"
                  onClick={() => handleItemClick("albums")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "albums" ? "text-yellow-500" : ""
                  }`}
                >
                  <RiAlbumLine
                    className={`mr-2 ${
                      activeItem === "albums" ? "text-yellow-500" : ""
                    }`}
                  />
                  Albums
                </Link>
                <Link
                  to="#"
                  onClick={() => handleItemClick("genres")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "genres" ? "text-yellow-500" : ""
                  }`}
                >
                  <MdSpatialTracking
                    className={`mr-2 ${
                      activeItem === "genres" ? "text-yellow-500" : ""
                    }`}
                  />
                  Genres
                </Link>
                <Link
                  to="#"
                  onClick={() => handleItemClick("decades")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "decades" ? "text-yellow-500" : ""
                  }`}
                >
                  <FcCompactCamera
                    className={`mr-2 ${
                      activeItem === "decades" ? "text-yellow-500" : ""
                    }`}
                  />
                  Decades
                </Link>
                <Link
                  to="#"
                  onClick={() => handleItemClick("geos")}
                  className={`p-2 hover:bg-yellow-50 hover:text-yellow-500 flex items-center rounded-md transition duration-200 ${
                    activeItem === "geos" ? "text-yellow-500" : ""
                  }`}
                >
                  <ImEarth
                    className={`mr-2 ${
                      activeItem === "geos" ? "text-yellow-500" : ""
                    }`}
                  />
                  Geos
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
