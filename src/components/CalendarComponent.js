// src/components/CalendarComponent.js
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderComponent.css';

const CalendarComponent = ({ events = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Update highlighted dates whenever events change
    setHighlightedDates(events.map(event => new Date(event.date)));
  }, [events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
    setSelectedEvent(event || null);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) =>
          highlightedDates.some(d => d.toDateString() === date.toDateString()) ? 'highlight' : null
        }
      />
      {selectedEvent ? (
        <div className="event-details">
          <h4>{selectedEvent.title}</h4>
          <p>{selectedEvent.description}</p>
        </div>
      ) : (
        <p className="no-event">Select a date to see details.</p>
      )}
    </div>
  );
};

export default CalendarComponent;
