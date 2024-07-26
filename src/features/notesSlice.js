import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    searchTerm: '',
  },
  reducers: {
    // Reducer to add a new note at the beginning
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    // Reducer to delete a note by its id
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    // Reducer to edit an existing note by its id
    editNote: (state, action) => {
      const { id, title, content, timestamp } = action.payload;
      const existingNote = state.notes.find(note => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.content = content;
        existingNote.timestamp = timestamp;
      }
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    // Reducer to set the search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addNote, deleteNote, editNote, setSearchTerm } = notesSlice.actions;
export default notesSlice.reducer;
