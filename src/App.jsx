import React, { useState } from "react";

const CalendarGrid = () => {
  const columns = 48; // Number of columns
  const rows = 7; // Number of rows (days of the week)
  const totalCells = columns * rows;

  // State to track clicked cells
  const [clickedCells, setClickedCells] = useState({});

  // Generate time intervals for 48 columns (24 hours divided into 30-minute intervals)
  const generateTimeIntervals = () => {
    const intervals = [];
    for (let i = 0; i < columns; i++) {
      const hour = Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      const nextHour = Math.floor((i + 1) / 2);
      const nextMinute = i % 2 === 0 ? "30" : "00";

      intervals.push(
        `${hour.toString().padStart(2, "0")}:${minute}-${nextHour
          .toString()
          .padStart(2, "0")}:${nextMinute}`
      );
    }
    return intervals;
  };

  const timeLabels = generateTimeIntervals();

  // Days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Handle cell click
  const handleCellClick = (rowIndex, columnIndex) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    const day = daysOfWeek[rowIndex];
    const time = timeLabels[columnIndex];

    // Toggle clicked state
    setClickedCells((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey], // Toggle the state of the clicked cell
    }));

    // Log the day and time to the console
    console.log(`Day: ${day}, Time: ${time}`);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center overflow-auto">
      <div className="relative w-full h-full grid" style={{ gridTemplateColumns: `auto repeat(${columns}, 1fr)` }}>
        {/* Sticky Left Column */}
        {daysOfWeek.map((day, rowIndex) => (
          <div
            key={day}
            className="sticky p-2 left-0 z-10 bg-white border-0.5 border-gray-300 flex items-center justify-center font-semibold text-gray-700"
            style={{
              gridRow: rowIndex + 1, // Each day occupies one row
              gridColumn: 1, // First column
            }}
          >
            {day}
          </div>
        ))}

        {/* Grid Cells */}
        {Array.from({ length: totalCells }, (_, index) => {
          const rowIndex = Math.floor(index / columns); // Determine which row this cell belongs to
          const columnIndex = index % columns; // Determine which column this cell belongs to
          const label = timeLabels[columnIndex];
          const cellKey = `${rowIndex}-${columnIndex}`;
          const isClicked = clickedCells[cellKey];

          return (
            <div
              key={index}
              onClick={() => handleCellClick(rowIndex, columnIndex)} // Handle click event
              className={`border-0.5 p-2 px-4 border-gray-200 text-center flex items-center justify-center text-xs md:text-sm font-medium text-gray-800 transition-all cursor-pointer ${
                isClicked ? "bg-blue-300" : "bg-blue-50"
              }`}
              style={{
                gridRow: rowIndex + 1, // Match the day row
                gridColumn: columnIndex + 2, // Start after the sticky column
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;