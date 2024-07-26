import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addNote, editNote } from '../features/notesSlice';

// NoteForm component for adding and editing notes
const NoteForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector(state => state.notes.notes);
  const noteToEdit = notes.find(note => note.id === id);

  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : '');
  const [content, setContent] = useState(noteToEdit ? noteToEdit.content : '');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    if (noteToEdit) {
      dispatch(editNote({ id, title, content, timestamp }));
    } else {
      dispatch(addNote({
        id: Date.now().toString(),
        title,
        content,
        timestamp,
      }));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
