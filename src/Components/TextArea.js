import React, { useContext, useState } from "react";
import noteContext from '../Context/Notes/NoteContext'

export const TextArea = () => {
  const context = useContext(noteContext);
  const [newNote,setNewNote] = useState({title:"",description:"",tag:""});

  const notechanged = (e)=>{
    setNewNote({...newNote,[e.target.name]:e.target.value});
  }
  const saveNote = (e)=>{
    e.preventDefault();
    context.addNote(newNote);
    setNewNote({title:"",description:"",tag:""});
  }
  return (
    <form>
        <p class="text-4xl font-semibold text-gray-900 dark:text-white">Write a Note here</p>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div class="mb-1">
    <input type="text" name="title" value={newNote.title} placeholder="Your Title" id="default-input" onChange={notechanged} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    </div>
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="4"
            name="description"
            value={newNote.description}
            onChange={notechanged}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write description..."
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            onClick={saveNote}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Save Note
          </button>
        </div>
      </div>
    </form>
  );
};
