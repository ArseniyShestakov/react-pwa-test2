import React, { useState } from 'react';
import { Note } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import { PlusIcon } from './components/icons';

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleOpenEditor = (note: Note | null) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setEditingNote(null);
    setIsEditorOpen(false);
  };

  const handleSaveNote = (noteToSave: Note) => {
    const existingIndex = notes.findIndex(n => n.id === noteToSave.id);
    if (existingIndex > -1) {
      const updatedNotes = [...notes];
      updatedNotes[existingIndex] = noteToSave;
      setNotes(updatedNotes);
    } else {
      setNotes([noteToSave, ...notes]);
    }
    handleCloseEditor();
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    handleCloseEditor();
  };
  
  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <header className="sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                 <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notes</h1>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {notes.length === 0 ? (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-slate-500">No notes yet.</h2>
                <p className="text-slate-400 mt-2">Click the '+' button to create your first note!</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedNotes.map(note => (
                <NoteCard key={note.id} note={note} onClick={() => handleOpenEditor(note)} />
            ))}
            </div>
        )}
      </main>

      <button
        onClick={() => handleOpenEditor(null)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label="Create new note"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <NoteEditor
        note={editingNote}
        isOpen={isEditorOpen}
        onSave={handleSaveNote}
        onClose={handleCloseEditor}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default App;
