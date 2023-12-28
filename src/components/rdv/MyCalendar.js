import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from './Modal';

moment.locale('fr');
const localizer = momentLocalizer(moment);

function formatEvents(apiData) {
  if (!Array.isArray(apiData)) {
    console.error("Error: Data is not an array");
    return [];
  }

  return apiData.map((event, index) => ({
    id: index,
    title: event.description,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
  }));
}

const MyCalendar = ({ data , performNewRdv}) => {
  const [currentView, setCurrentView] = useState(Views.MONTH); 
  const [eventsList, setEventsList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [start, setStart] = useState();
  
  useEffect(() => {
    const events = formatEvents(data);
    setEventsList(events);
  }, [data]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  function handleSelect({ start, end }) {
    setModalOpen(true);
    setStart(start);
    
  }

  return (
    <div style={{ padding: '14px' }}>
             {modalOpen && <Modal setOpenModal={setModalOpen} start={start} performNewRdv={performNewRdv} />}
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={eventsList}
        selectable={true}
        max={moment('2023-03-18T18:00:00').toDate()}
        min={moment('2023-03-18T08:00:00').toDate()}
        style={{ height: 500, color: 'black' }}
        views={[Views.MONTH, Views.DAY]}
        view={currentView}
        onView={handleViewChange} // Callback for view change
        onSelectSlot={handleSelect}
        onSelectEvent={event => alert(event)}
        longPressThreshold={1}
      />
    </div>
  );
};

export default MyCalendar;
 