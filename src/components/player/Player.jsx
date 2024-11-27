import { useState } from "react";
import { AiOutlineRedo, AiOutlineSound } from "react-icons/ai";
import { FaRandom, FaStepBackward, FaStepForward } from "react-icons/fa";
import { MdPause, MdPlayArrow, MdOutlineChat } from "react-icons/md";
import { BiDevices } from "react-icons/bi";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(6); // Example current time
  const [duration] = useState(10); // Example duration

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div>
      <div>
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md w-full ">
          {/* Album Artwork */}
          <div className="w-16 h-16 rounded overflow-hidden">
            <img
              src="https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg" // Replace with album artwork
              alt="Kesariya"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Song Details */}
          <div className="ml-4 flex-grow">
            <h3 className="text-lg font-bold">Kesariya</h3>
            <p className="text-sm text-gray-600">Pritam</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Shuffle */}
            <button className="text-gray-600 hover:text-black">
              <FaRandom />
            </button>

            {/* Previous */}
            <button className="text-gray-600 hover:text-black">
              <FaStepBackward />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full"
            >
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>

            {/* Next */}
            <button className="text-gray-600 hover:text-black">
              <FaStepForward />
            </button>

            {/* Repeat */}
            <button className="text-gray-600 hover:text-black">
              <AiOutlineRedo />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="ml-4 flex flex-col w-1/4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              className="w-full accent-gray-800"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{`00:${String(currentTime).padStart(2, "0")}`}</span>
              <span>{`00:${String(duration).padStart(2, "0")}`}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="ml-4">
            <input
              type="range"
              min="0"
              max="100"
              className="accent-gray-800"
              title="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
