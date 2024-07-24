import React, { useState } from "react";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const months = [
    { name: "Januari", number: 0 },
    { name: "Februari", number: 1 },
    { name: "Mars", number: 2 },
    { name: "April", number: 3 },
    { name: "Maj", number: 4 },
    { name: "Juni", number: 5 },
    { name: "Juli", number: 6 },
    { name: "Augusti", number: 7 },
    { name: "September", number: 8 },
    { name: "Oktober", number: 9 },
    { name: "November", number: 10 },
    { name: "December", number: 11 },
  ];
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const [numColumns, setNumColumns] = useState(2);
  const [columnNames, setColumnNames] = useState(Array(numColumns).fill(""));

  const getDaysInMonth = (monthNumber, year) => {
    return new Date(year, monthNumber + 1, 0).getDate();
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;

    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const renderDaysTable = () => {
    const month = months.find((month) => month.name === selectedMonth);
    if (!month) return null;

    const currentYear = new Date().getFullYear(); // Assuming current year for simplicity
    const daysInMonth = getDaysInMonth(month.number, currentYear);

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentYear, month.number, i);
      const isSunday = dayDate.getDay() === 0;
      const isMonday = dayDate.getDay() === 1;
      days.push(
        <tr key={i}>
          <td style={isSunday ? { color: "red" } : undefined}>
            {isMonday ? `${i} (v ${getWeekNumber(dayDate)})` : i}
          </td>
        </tr>
      );
    }
    return (
      <table>
        <thead>
          <tr>
            <th className="table-month">
              <h2>{selectedMonth}</h2>
              {columnNames.map((name, index) => (
                <td style={{ border: "none" }} key={index}>
                  {name}
                </td>
              ))}
            </th>
          </tr>
        </thead>
        <tbody>{days}</tbody>
      </table>
    );
  };

  const handleNumColumnsChange = (e) => {
    const newNumColumns = Number(e.target.value);
    setNumColumns(newNumColumns);
    setColumnNames(Array(newNumColumns).fill(""));
  };

  const handleColumnNameChange = (index, e) => {
    const newColumnNames = [...columnNames];
    newColumnNames[index] = e.target.value;
    setColumnNames(newColumnNames);
  };

  const renderColumnHeaders = () => {
    return (
      <div className="input-row">
        {columnNames.map((header, index) => (
          <div style={{ display: "flex" }} key={index}>
            <input
              style={{ flexGrow: 1 }}
              type="text"
              placeholder="Enter column name"
              value={header}
              onChange={(e) => handleColumnNameChange(index, e)}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderColumns = () => {
    const month = months.find((m) => m.name === selectedMonth);
    if (!month) return null;

    const days = [];
    for (let i = 1; i <= month.days; i++) {
      const dayColumns = [];
      for (let j = 0; j < numColumns; j++) {
        dayColumns.push(<td key={j}>{i}</td>);
      }
      days.push(<tr key={i}>{dayColumns}</tr>);
    }
    return <>{renderDaysTable()}</>;
  };

  const [imageSource, setImageSource] = useState("/template.png");

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="selects-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setImageSource(e.target.elements.imageLink.value);
          }}
        >
          <input type="text" name="imageLink" placeholder="image link" />
          <button style={{ width: "100%" }} type="submit">
            Set image
          </button>
        </form>
        <div style={{ display: "flex" }}>
          <select
            style={{ flexGrow: 1 }}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">Select a month</option>
            {months.map((month) => (
              <option key={month.name} value={month.name}>
                {month.name}
              </option>
            ))}
          </select>
          <select
            style={{ flexGrow: 1 }}
            value={numColumns}
            onChange={handleNumColumnsChange}
          >
            {[...Array(4).keys()].map((value) => (
              <option key={value + 2} value={value + 2}>
                {value + 2}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              handlePrint();
            }}
          ></button>
        </div>
        <div>{renderColumnHeaders()}</div>
      </div>
      <div className="calendar-container">
        <img
          style={{ aspectRatio: 21 / 9, maxWidth: "100%", width: "100%" }}
          src={imageSource}
          alt="Chose a picture with a 21:9 ratio"
        />

        {renderColumns()}
      </div>
    </>
  );
};

export default Calendar;
