import NoteContext from "./NoteContext";
import { useState } from "react";
const host = "http://localhost:4500";

const NoteState = (props)=>{
      let lastresp = null;

      const [notes,setNotes] = useState([]);

      //fetch all notes
      const fetchNotes = async ()=>{
        const response = await fetch(host+"/api/notes/fetchallnotes", {
          method: 'GET',
          headers: {
            'auth-token': localStorage.getItem('token')
          },
          // body: JSON.stringify(data)
        });
        const json = await response.json();
        setNotes(json);
      }

      //add new note
      const addNote = async (note)=>{
        const response = await fetch(host+"/api/notes/newnote", {
          method: 'POST',
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
        });
        lastresp = response;
        fetchNotes();
      }

      //edit a note
      const editNote = async (id,note)=>{
        const response = await fetch(host+"/api/notes/update/"+id, {
          method: 'PUT',
          headers: {
            'auth-token': localStorage.getItem('token'),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(note)
        });
        lastresp = response;

        fetchNotes();
        return 200;
      }

      //delete a note 
      const deleteNote = async (id)=>{
        const response = await fetch(host+"/api/notes/delete/"+id, {
          method: 'DELETE',
          headers: {
            'auth-token': localStorage.getItem('token'),
          }
        });
        lastresp = response;
        console.log(lastresp);
        fetchNotes();
      }
      const signout = ()=>{
        setNotes([]);
        localStorage.removeItem("token");
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,signout,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;