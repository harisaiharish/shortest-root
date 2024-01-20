import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { push, ref, set, get, exists } from 'firebase/database';

const EventComponent = () => {
  const [user, setUser] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserDetails(user.uid);
      } else {
        setUser(null);
        setParticipants([]);
        setEvents([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const userSnapshot = await get(ref(database, `users/${userId}`));
      if (exists(userSnapshot.val())) {
        const userData = userSnapshot.val();
        setParticipants([userData]);
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error('Error fetching user details: ', error);
    }
  };

  const createParticipant = async () => {
    try {
      await set(ref(database, `users/${user.uid}`), {
        location: { latitude: 0, longitude: 0 },
        travel_type: 'Car',
      });

      console.log('Participant created successfully.');
    } catch (error) {
      console.error('Error creating participant: ', error);
    }
  };

  const createEvent = async () => {
    try {
      const eventKey = push(ref(database, 'events')).key;

      await set(ref(database, `events/${eventKey}`), {
        centerPoint: { latitude: 12, longitude: 23 },
        typeOfEvent: 'Restaurant',
        eventHead: user.uid,
        participants: {
          [user.uid]: true,
        },
      });

      console.log('Event created successfully.');
    } catch (error) {
      console.error('Error creating event: ', error);
    }
  };

  const fetchEventDetails = async () => {
    try {
      const eventsSnapshot = await get(ref(database, 'events'));
      const eventsData = eventsSnapshot.val();
  
      if (eventsData !== null) {
        const eventsArray = Object.values(eventsData);
        setEvents(eventsArray);
      } else {
        console.log('No events found.');
      }
    } catch (error) {
      console.error('Error fetching event details: ', error);
    }
  };

  return (
    <div>
      {user && <p>Welcome, {user.displayName || user.email}!</p>}

      <button onClick={createParticipant}>Create Participant</button>

      <button onClick={createEvent}>Create Event</button>

      <button onClick={fetchEventDetails}>Fetch Event Details</button>

      <div>
        <h3>Participant Details:</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{JSON.stringify(participant)}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Event Details:</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{JSON.stringify(event)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventComponent;
