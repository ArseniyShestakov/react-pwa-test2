
import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  const contentPreview = note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content;
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className="p-5 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
      style={{ backgroundColor: note.color }}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2 text-slate-800 truncate">{note.title}</h3>
      <p className="text-slate-700 mb-4 whitespace-pre-wrap break-words">{contentPreview}</p>
      <p className="text-xs text-slate-600 text-right">{formatDate(note.updatedAt)}</p>
    </div>
  );
};

export default NoteCard;
