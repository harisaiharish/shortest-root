// src/Components/EventComponent/EventComponent.jsx

import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { push, ref, set } from 'firebase/database';

const EventComponent = () => {
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

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const createParticipants = async () => {
    try {
      // Assuming this is triggered when you want to create participants
      await set(ref(database, 'users/user12'), {
        location: { latitude: 0, longitude: 0 },
        travel_type: 'Car',
      });

      await set(ref(database, 'users/user15'), {
        location: { latitude: 0, longitude: 0 },
        travel_type: 'Bus',
      });

      await set(ref(database, 'users/user19'), {
        location: { latitude: 0, longitude: 0 },
        travel_type: 'Bicycle',
      });

      console.log('Participants created successfully.');
    } catch (error) {
      console.error('Error creating participants: ', error);
    }
  };

  const createEvent = async () => {
    try {
      // Assuming this is triggered when you want to create an event
      const eventKey = push(ref(database, 'events')).key;

      await set(ref(database, `events/${eventKey}`), {
        centerPoint: { latitude: 12, longitude: 23 },
        typeOfEvent: 'Restaurant',
        eventHead: 'user15', // Assuming 'user15' is the UID of the user
        participants: {
          user12: true,
        },
      });

      console.log('Event created successfully.');
    } catch (error) {
      console.error('Error creating event: ', error);
    }
  };

  return (
    <div>
      {/* Display user information */}
      {user && <p>Welcome, {user.displayName || user.email}!</p>}

      <button onClick={createParticipants}>Create Participants</button>
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
};

export default EventComponent;
