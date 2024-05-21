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
<div className="container mx-auto  p-3 " style={{ marginBottom: '20px', width: '90%' }}>

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
    />

</div>

      {showForm && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg z-10">
            <h2 className="text-2xl mb-4">Add Event</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              />
              <input
                type="date"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded"
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




