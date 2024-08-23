import React, { useState, useEffect } from 'react';
import './App.css';

const SeatSelection = () => {
  const [seats, setSeats] = useState(Array(10).fill().map(() => Array(30).fill('free')));

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/seats')
  //     .then(res => res.json())
  //     .then(data => setSeats(data));
  // }, []);

  const handleSeatClick = (rowIndex, seatIndex) => {
    if (seats[rowIndex][seatIndex] === 'free') {
      const updatedSeats = [...seats];
      updatedSeats[rowIndex][seatIndex] = 'selected';
      setSeats(updatedSeats);
    //   fetch('http://localhost:5000/api/select-seat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ row: rowIndex + 1, seat: seatIndex + 1 })
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (!data.success) {
    //       alert(data.message);
    //     }
    //   });
    }
  };

  return (
    <div className="seat-selection">
      {seats.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat, seatIndex) => (
            <button
              key={seatIndex}
              className={`seat ${seat}`}
              onClick={() => handleSeatClick(rowIndex, seatIndex)}
              disabled={seat === 'booked' || seat === 'pending' || seat === 'disabled'}
            >
              {seatIndex + 1}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Movie Seat Selection</h1>
      <SeatSelection />
    </div>
  );
}
