import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

moment.locale('fr');
const localizer = momentLocalizer(moment);

function formatEvents(apiData) {
  if (!Array.isArray(apiData)) {
    console.error("Error: Data is not an array");
    return [];
  }

  return apiData.map((event, index) => ({
    id: index,
    title: event.type,
    start: new Date(event.dateStart),
    end: new Date(event.dateEnd),
  }));
}

const MyCalendar = ({ data }) => {
  const [currentView, setCurrentView] = useState(Views.MONTH); // Default view is month
  const events = formatEvents(data);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div style={{ padding: '14px' }}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={events}
        max={moment('2023-03-18T18:00:00').toDate()}
        min={moment('2023-03-18T08:00:00').toDate()}
        style={{ height: 500, color: 'black' }}
        views={[Views.MONTH, Views.DAY]}
        view={currentView}
        onView={handleViewChange} // Callback for view change
      />
    </div>
  );
};

export default MyCalendar;
 