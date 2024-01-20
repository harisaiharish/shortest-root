import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const EventComponent = () => {
  const [eventData, setEventData] = useState({
    centerPoint: { latitude: 0, longitude: 0 },
    typeOfEvent: '',
    eventHead: '',
    participants: {},
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
      {user && <p>Welcome, {user.displayName || user.email}!</p>}

      <button onClick={createEvent}>Create Event</button>
      <button onClick={() => addParticipant('eventId123', 'userId456')}>Add Participant</button>
      <button onClick={() => getEventInformation('eventId123')}>Get Event Information</button>
    </div>
  );
};

export default EventComponent;
