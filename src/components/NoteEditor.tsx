import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { TrashIcon, CloseIcon } from './icons';

interface NoteEditorProps {
  note: Note | null;
  isOpen: boolean;
  onSave: (note: Note) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const NOTE_COLORS = [
    '#FFFFFF', // White
    '#fecaca', // Red
    '#fed7aa', // Orange
    '#fef08a', // Yellow
    '#d9f99d', // Lime
    '#bfdbfe', // Blue
];

const NoteEditor: React.FC<NoteEditorProps> = ({ note, isOpen, onSave, onClose, onDelete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(NOTE_COLORS[0]);
  
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setColor(note.color);
    } else {
      setTitle('');
      setContent('');
      setColor(NOTE_COLORS[0]);
    }
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      onClose();
      return;
    }
    const now = Date.now();
    onSave({
      id: note?.id || `note_${now}`,
      title: title || 'Untitled Note',
      content,
      createdAt: note?.createdAt || now,
      updatedAt: now,
      color,
    });
  };

  const handleDelete = () => {
    if (note) {
      onDelete(note.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div 
        className="w-full max-w-2xl rounded-lg shadow-2xl flex flex-col transition-transform duration-300" 
        style={{backgroundColor: color}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex-grow flex flex-col">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="text-2xl font-bold bg-transparent focus:outline-none w-full mb-4 text-slate-900 placeholder-slate-500"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Take a note..."
                className="flex-grow bg-transparent focus:outline-none w-full text-slate-800 placeholder-slate-500 resize-none text-lg"
                rows={10}
            />
        </div>
        <div className="flex items-center justify-between p-4 bg-black bg-opacity-5 rounded-b-lg">
            <div className="flex items-center space-x-2">
                {NOTE_COLORS.map(c => (
                    <button 
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform duration-150 ${color === c ? 'border-blue-500 scale-110' : 'border-transparent hover:border-slate-400'}`}
                        style={{backgroundColor: c}}
                        aria-label={`Set note color to ${c}`}
                    />
                ))}
            </div>
            <div className="flex items-center space-x-2">
                {note && (
                    <button onClick={handleDelete} className="p-2 text-slate-600 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors">
                        <TrashIcon className="w-6 h-6" />
                    </button>
                )}
                <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                    Done
                </button>
            </div>
        </div>
      </div>
       <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors">
         <CloseIcon className="w-8 h-8" />
       </button>
    </div>
  );
};

export default NoteEditor;
