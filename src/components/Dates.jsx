import React, { useState } from "react";

const Dates = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const months = [
    { name: "Januari", days: 31 },
    { name: "Februari", days: 29 },
    { name: "Mars", days: 31 },
    { name: "April", days: 30 },
    { name: "Maj", days: 31 },
    { name: "Juni", days: 30 },
    { name: "Juli", days: 31 },
    { name: "Augusti", days: 31 },
    { name: "September", days: 30 },
    { name: "Oktober", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const [numColumns, setNumColumns] = useState(2);
  const [columnNames, setColumnNames] = useState(Array(numColumns).fill(""));

  const renderDaysTable = () => {
    const month = months.find((m) => m.name === selectedMonth);
    if (!month) return null;

    const days = [];
    for (let i = 1; i <= month.days; i++) {
      days.push(
        <tr key={i}>
          <td>{i}</td>
        </tr>
      );
    }
    return (
      <table>
        <tr>
          <td className="table-month">
            <h2>{selectedMonth}</h2>
            {columnNames.map((name, index) => (
              <p key={index}>{name}</p>
            ))}
          </td>
        </tr>
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
          <div key={index}>
            <input
              type="text"
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

  return (
    <>
      <div className="selects-container">
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select a month</option>
          {months.map((month) => (
            <option key={month.name} value={month.name}>
              {month.name}
            </option>
          ))}
        </select>
        <select value={numColumns} onChange={handleNumColumnsChange}>
          {[...Array(4).keys()].map((value) => (
            <option key={value + 2} value={value + 2}>
              {value + 2}
            </option>
          ))}
        </select>
        {renderColumnHeaders()}
      </div>
      <img src="" />
      <div className="calendar-container">{renderColumns()}</div>
    </>
  );
};

export default Dates;
