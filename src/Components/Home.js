import React, { useEffect } from 'react'
import { TextArea } from './TextArea'
import {AllNotes} from './AllNotes'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    let navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem('token'))navigate('/login');
    })
    
  return (
    <div className="container mx-auto">
        <TextArea/>
        <br/>
        <AllNotes/>
    </div>
     
  )
}
