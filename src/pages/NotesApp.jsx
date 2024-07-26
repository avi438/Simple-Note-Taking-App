import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteForm from '../components/NoteForm';
import '../assets/styles/index.css';

// Main NotesApp component containing routes
const NotesApp = () => {
  return (
    <div className="container">
      <Router>
        <h1>Notes App</h1>
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/new" element={<NoteForm />} />
          <Route path="/edit/:id" element={<NoteForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default NotesApp;
