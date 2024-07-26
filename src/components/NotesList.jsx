import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNote, setSearchTerm } from '../features/notesSlice';

// NotesList component for displaying notes and managing search, pagination, and deletion
const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, searchTerm } = useSelector(state => state.notes);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  const handleDelete = (id) => {
    const listItem = document.getElementById(`note-${id}`);
    if (listItem) {
      listItem.classList.add('deleting');
      setTimeout(() => {
        dispatch(deleteNote(id));
      }, 200); 
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  return (
    <>
      <input
        type="text"
        placeholder="Search Notes..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Link to="/new">
        <button className="add">Add Note</button>
      </Link>
      <ul>
        {currentNotes.map(note => (
          <li key={note.id} id={`note-${note.id}`} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{note.timestamp}</small>
            <div>
              <Link to={`/edit/${note.id}`} className="edit">Edit</Link>
              <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default NotesList;
