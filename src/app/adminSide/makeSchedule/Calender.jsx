"use client"
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function CalendarPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', start: '' });
  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable
  const [eventList, setEventList] = useState([
   
  ]);

  useEffect(() => {
    if (formSubmitted) {
      setFormSubmitted(false); // Reset formSubmitted state
    }
  }, [formSubmitted]);

  const handleDateClick = (arg) => {
    setFormData({ ...formData, start: arg.dateStr });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    const newEvent = { ...formData };
    setFormData({ title: '', start: '' });
    setEventList([...eventList, newEvent]); // Update eventList with new event
    setFormSubmitted(true); // Set formSubmitted state to trigger re-render of FullCalendar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="relative">
<div className="container mx-auto  p-3 " style={{ marginBottom: '20px', width: '1000px'} }>

    <FullCalendar
      plugins={[
        resourceTimelinePlugin,
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin,
      ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      }}
      initialView="resourceTimelineWeek"
      nowIndicator={true}
      editable={true}
      selectable={true}
      selectMirror={true}
      dateClick={handleDateClick}
      events={eventList} // Use eventList as events data
      rerenderDelay={10} // Add a slight delay to rerender FullCalendar
      height={600}
      width={1000}
    />

</div>

{showForm && (
  <div style={{
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)' // Optional: to add a backdrop
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      zIndex: '10'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '1rem'
      }}>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          style={{
            border: '1px solid #D1D5DB',
            borderRadius: '0.25rem',
            padding: '0.5rem',
            width: '100%',
            marginBottom: '1rem'
          }}
        />
        <input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleChange}
          style={{
            border: '1px solid #D1D5DB',
            borderRadius: '0.25rem',
            padding: '0.5rem',
            width: '100%',
            marginBottom: '1rem'
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              fontWeight: '600',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              marginRight: '0.5rem',
              cursor: 'pointer',
              border: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
          >
            Add Event
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{
              backgroundColor: '#D1D5DB',
              color: '#374151',
              fontWeight: '600',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              border: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9CA3AF'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}




