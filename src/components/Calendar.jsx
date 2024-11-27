import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Modal Component
const Modal = ({ isOpen, onClose, onSave, hour }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [selectedMinute] = useState(0);
  const [duration, setDuration] = useState(); // Default duration set to 60 minutes
  const [genre, setGenre] = useState(""); // New state for genre

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventTitle, hour, selectedMinute, duration, genre); // Pass genre to onSave
    setEventTitle(""); // Clear input
    setDuration(); // Reset duration
    setGenre(""); // Reset genre to default value
    onClose(); // Close modal
  };

  const handleDurationChange = (e) => {
    const value = Number(e.target.value);
    if (value <= 59) {
      // Ensure duration does not exceed 59
      setDuration(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event Title"
            className="border p-2 w-full"
            required
          />

          <input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            placeholder="Duration (minutes)"
            className="border p-2 w-full mt-2"
            required
            min="1"
            max="59"
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)} // Handle genre change
            className="border p-2 w-full mt-2"
            required
          >
            <option value="">Select Genre</option>
            <option value="red">Heavy Metal</option>
            <option value="green">Classic</option>
            <option value="blue">Hip Hop</option>
            <option value="pink">Rock</option>
            <option value="yellow">Pop</option>
            <option value="purple">Jazz</option>
          </select>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null); // New state for selected hour

  const genreColors = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
  };

  useEffect(() => {
    // Load events from local storage on component mount
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const parsedEvents = storedEvents.map((event) => ({
      ...event,
      date: new Date(event.date), // Convert date string back to Date object
    }));
    setEvents(parsedEvents);
  }, []);

  // Get month name and year
  const getMonthYear = () => {
    return currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  // Get days for the current month
  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Previous month's days to fill the first row
    const prevDays = Array.from({ length: firstDayOfMonth }, () => null);

    // Current month's days
    const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...prevDays, ...currentDays];
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDay(null); // Reset selected day when navigating
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDay(null); // Reset selected day when navigating
  };

  // Handle day click
  const handleDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();

    // Check if the selected date is in the past
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return; // Do not allow selection of past dates
    }

    // If the selected date is today, check if the selected hour is in the past
    if (selectedDate.toDateString() === today.toDateString()) {
      const selectedHour = new Date().getHours();
      if (day === selectedDay && selectedHour < new Date().getHours()) {
        return; // Do not allow selection of past hours on the current day
      }
    }

    setSelectedDay(day);
  };

  // Add a new event
  const addEvent = (hour) => {
    const today = new Date();
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDay
    );

    // Check if the selected day is today and the selected hour is in the past
    if (
      selectedDate.toDateString() === today.toDateString() &&
      hour < today.getHours()
    ) {
      toast.error("Cannot add events for past hours."); // Show error toast
      return; // Do not allow adding events for past hours
    }

    setSelectedHour(hour); // Set the selected hour
    setIsModalOpen(true); // Open modal
  };

  const handleSaveEvent = (eventTitle, hour, minute, duration, genre) => {
    const existingEvents = events.filter(
      (event) =>
        new Date(event.date).getHours() === hour &&
        new Date(event.date).getDate() === selectedDay
    );

    // Calculate total duration of existing events in the hour
    const totalDuration = existingEvents.reduce(
      (acc, event) => acc + event.duration,
      0
    );

    // Check if adding the new event would exceed 60 minutes
    if (totalDuration + duration > 60) {
      toast.error(
        "Total event duration in this hour cannot exceed 60 minutes."
      ); // Show error toast
      return; // Exit the function if the limit is exceeded
    }

    const newEventStartTime =
      existingEvents.length > 0
        ? new Date(
            existingEvents[existingEvents.length - 1].date.getTime() +
              existingEvents[existingEvents.length - 1].duration * 60000
          ) // Add duration of the last event
        : new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            selectedDay,
            hour,
            minute
          );

    const newEvent = {
      title: eventTitle,
      date: newEventStartTime.toISOString(), // Store date as an ISO string
      duration: duration,
      genre: genre,
      color: genreColors[genre] || "bg-gray-200",
    };

    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents)); // Save updated events to local storage
      return updatedEvents;
    });

    toast.success("Event added successfully!");
  };
  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold">{getMonthYear()}</h2>
        <button
          onClick={goToNextMonth}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &gt;
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 sm:grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 sm:grid-cols-7 gap-2 mt-2 text-center">
        {getCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              day
                ? new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  ) < new Date().setHours(0, 0, 0, 0)
                  ? "bg-gray-300 cursor-not-allowed" // Disable past dates
                  : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                : "bg-transparent"
            } ${day === selectedDay ? "bg-blue-500 text-white" : ""}`}
            onClick={() => day && handleDayClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Hourly Schedule */}
      {selectedDay && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">
            Schedule for {`${selectedDay} ${getMonthYear()}`}
          </h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 divide-y divide-gray-200">
            {Array.from({ length: 24 }, (_, hour) => (
              <div
                key={hour}
                className="flex justify-between  py-2 cursor-pointer hover:bg-gray-100 sm:flex-row flex-col"
                onClick={() => addEvent(hour)}
              >
                <span className="text-sm font-medium">{`${hour}:00`}</span>
                <div className="flex-1 flex mx-1 ml-2 relative">
                  {events
                    .filter(
                      (event) =>
                        new Date(event.date).getHours() === hour &&
                        new Date(event.date).getDate() === selectedDay
                    )
                    .map((event, i) => (
                      <div
                        key={i}
                        className={`${event.color} mx-2 rounded mb-1`}
                        style={{ width: `${(event.duration / 60) * 100}%` }}
                      >
                        <span className="font-bold">{event.title}</span>
                        <span className="text-xs text-gray-600">
                          {" "}
                          - To be played
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Adding Event */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        hour={selectedHour}
      />
    </div>
  );
};

export default Calendar;
