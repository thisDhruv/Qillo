import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/Notes/NoteContext'
import { NoteItem } from './NoteItem';
export const AllNotes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
    
    useEffect(() => {

        if(localStorage.getItem('token'))context.fetchNotes();
        // eslint-disable-next-line
    },[])
    
  return (
    <>
    <p className="text-4xl font-semibold text-gray-900 dark:text-white">All Your Notes</p>
    <div className='h-56 grid grid-cols-3 gap-4 content-start'>
        {
            notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })
        }
    </div>
    </>
  )
}
