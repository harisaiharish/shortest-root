import React, { useState } from 'react';
import { database } from '../../firebase';

const EventComponent = () => {
  const [eventData, setEventData] = useState({
    centerPoint: { latitude: 0, longitude: 0 },
    typeOfEvent: '',
    eventHead: '',
    participants: {},
  });

  const createEvent = async () => {
    try {
      const eventRef = await push(ref(database, 'events'), eventData);
      console.log('Event created with ID: ', eventRef.key);
    } catch (error) {
      console.error('Error creating event: ', error);
    }
  };

  const addParticipant = async (eventId, userId) => {
    try {
      await set(ref(database, `events/${eventId}/participants/${userId}`), true);
      console.log('Participant added successfully.');
    } catch (error) {
      console.error('Error adding participant: ', error);
    }
  };

  const getEventInformation = async (eventId) => {
    try {
      const eventSnapshot = await get(ref(database, `events/${eventId}`));
      if (exists(eventSnapshot.val())) {
        const eventData = eventSnapshot.val();
        console.log('Event Information: ', eventData);
      } else {
        console.log('Event not found.');
      }
    } catch (error) {
      console.error('Error getting event information: ', error);
    }
  };

  return (
    <div>
      <button onClick={createEvent}>Create Event</button>
      <button onClick={() => addParticipant('eventId123', 'userId456')}>Add Participant</button>
      <button onClick={() => getEventInformation('eventId123')}>Get Event Information</button>
    </div>
  );
};

export default EventComponent;
