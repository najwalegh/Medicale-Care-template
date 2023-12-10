import React from 'react';
import { Calendar, momentLocalizer ,Views} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

moment.locale('fr'); 
const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Événement 1',
    start: new Date(2023, 11, 7, 10, 0), // année, mois (0-indexé), jour, heure, minute
    end: new Date(2023, 11, 7, 12, 0),
  },
  // Ajoutez d'autres événements si nécessaire
];


const MyCalendar = ({data}) => {
  console.log("events"+data)
  return(
    <div style={{padding: "14px"}}>
      <Calendar 
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      events={data}
      max={moment("2023-03-18T18:00:00").toDate()}
      min={moment("2023-03-18T08:00:00").toDate()}
      style={{ height: 500, color : 'black' }}
      views={[Views.MONTH,Views.DAY]}
      />
    </div>
  )
}

export default MyCalendar;


