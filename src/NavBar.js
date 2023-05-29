import React, { useState } from "react";
import "./styles/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import logoImage from "./logo-green.png";
import userAvatar from "./user-avatar.png";
import DatePicker from "react-datepicker";

function Navbar({ handleSearch }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [searchLocation, setSearchLocation] = useState("");

  const handleGuestsChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setGuests(value);
    }
  };

  const decrementGuests = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const incrementGuests = () => {
    setGuests(guests + 1);
  };

  const handleSearchClick = () => {
    handleSearch(searchLocation);
  };

  return (
    <header className="navbar flex items-center justify-between bg-gray-100 p-4">
      <div>
        <img src={logoImage} alt="Logo" className="h-12" />
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Search location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select dates"
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        />
        <div className="flex">
          <div className="relative">
            <input
              type="number"
              placeholder="Guests"
              value={guests}
              onChange={handleGuestsChange}
              className="mr-2 px-2 py-1 border border-gray-300 rounded"
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center">
              <button
                className="px-2 border-l border-gray-300"
                onClick={decrementGuests}
              >
                -
              </button>
              <button
                className="px-2 border-l border-r border-gray-300"
                onClick={incrementGuests}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button
          className="px-7 py-2 bg-teal-500 text-white rounded w-full"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      <div className="user-menu flex items-center">
        <img
          className="user-avatar w-8 h-8 rounded-full bg-gray-300"
          src={userAvatar}
          alt="User Avatar"
        />
        <div className="menu">Menu</div>
      </div>
    </header>
  );
}

export default Navbar;
