import React, { useEffect,useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/Notes/NoteContext';
import pic from '../profilepic.png'
import Dropdown from './Dropdown'

const host = "http://localhost:4500";

export const Profile = () => {
    const [details,setDetails]=useState({name:"",email:""});
    const context = useContext(NoteContext);
   let navigate = useNavigate();

    const handleSignout = ()=>{
      context.signout();
      navigate("/login");
    }

    const getUserDetails = async ()=>{
        const response = await fetch(host + "/api/auth/getuser", {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("token")
            },
          }); 
          const json = await response.json();
          setDetails({
            name:json.name,
            email:json.email
          });

    }
    useEffect(() => {
        const targetEl = document.getElementById("userDropdown");
        const triggerEl = document.getElementById("avatarButton");
        const dropdown = new Dropdown(targetEl, triggerEl);
        console.log(dropdown);
        getUserDetails();
    }, [])
    
  return (
    <>
    <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 mr-2 rounded-full cursor-pointer" src={pic} alt="User dropdown"/>

<div id="userDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
    <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
      <div>{details.name}</div>
      <div class="font-medium truncate">{details.email}</div>
    </div>
    <div class="py-1">
      <div onClick={handleSignout} Style={`cursor: pointer`} class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</div>
    </div>
</div>
    </>


  )
}

