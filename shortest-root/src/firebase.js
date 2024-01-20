// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCac4iw9U__EJ0uP8BOYhIkzoIx8K-1DCc",
    authDomain: "shortest-root.firebaseapp.com",
    databaseURL: "https://shortest-root-default-rtdb.firebaseio.com",
    projectId: "shortest root",
    storageBucket: "shortest-root.appspot.com",
    messagingSenderId: "250741981670",
    appId: "1:250741981670:web:eef252d1a52186dcf99627",
    measurementId: "G-5QYHNRNL35"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, database };
