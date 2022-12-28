import React, { useContext, useEffect, useState, useRef } from "react";
import Dropdown from "./Dropdown";
import noteContext from "../Context/Notes/NoteContext";
import Modal from './Modal';

export const NoteItem = (props) => {
  const context = useContext(noteContext);
  const note = props.note;
  const [newNote,setNewNote] = useState({title:note.title,description:note.description,tag:note.tag});


  const ref = useRef();
  
  const id = props.note._id;
  
  const updateNote = ()=>{
    console.log();
    // modal.toggle();
    ref.current.toggle();
  }

  const notechanged = (e)=>{
    setNewNote({...newNote,[e.target.name]:e.target.value});
  }
  const saveNote = (e)=>{
    e.preventDefault();
    context.editNote(id,newNote);
    ref.current._isHidden=false;
    ref.current.toggle();

    // modal._isHidden=false;
    // modal.toggle();
  }
  useEffect(() => {
    const targetEl = document.getElementById("dropdownMenu" + id);
    const triggerEl = document.getElementById("dropdownButton" + id);
    const dropdown = new Dropdown(targetEl, triggerEl);
    console.log(dropdown);
    
    const targetModal = document.getElementById("Modal" + id);
    const modal = new Modal(targetModal);
    ref.current=modal;
    // eslint-disable-next-line
  });

  return (
    <div  class="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="absolute top-0 right-0 m-2">
        <button
          id={`dropdownButton${id}`}
          data-dropdown-toggle="dropdown"
          class=" text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm "
          type="button"
        >
          <span class="sr-only">Open dropdown</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>

        <div
          id={`dropdownMenu${id}`}
          class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
        >
          <ul class="py-1" aria-labelledby="dropdownButton">
            <li>
              <div
                onClick={() => {
                  updateNote();
                }}
                class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  context.deleteNote(id);
                }}
                class="block cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {note.description}
        </p>
      </div>


    {/* modal toggle and modal code */}
<button class="hidden block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle={`Modal${id}`}>
  Toggle modal
</button>

<div id={`Modal${id}`} tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Note
                </h3>
                <button type="button"  onClick={()=>{ref.current.toggle()}}  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle={`Modal${id}`}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <form>
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
            Update
          </button>
        </div>
      </div>
    </form>
        </div>
    </div>
</div>





    </div>
  );
};
