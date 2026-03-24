import React from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';


const Dashboard = () => {
  const chat = useChat(); 
    const {user} = useSelector((state) => state.auth);
    console.log("user" ,user);


    useEffect(() =>{
      chat.initializeSocketConnection()

      return () => {
        Socket.disconnect()
      }
    },[])
    
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard