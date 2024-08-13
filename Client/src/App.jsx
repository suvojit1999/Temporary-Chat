import React, { useEffect } from 'react';
import { useRef, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Chatbox from './pages/Chatbox';

import { v4 as uuid } from 'uuid';
import copy from 'clipboard-copy';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tempMsgContext } from './_context/tempMsgContext';

import { useNavigate } from 'react-router-dom';



function App() {
  const [RoomId, setRoomId] = useState('')
  const [Name, setName] = useState('')
  const [RoomUpdate, setRoomUpdate] = useState(false)
  const RId = useRef(null)

  const navigate = useNavigate(null);

  const generateId = () => {
    RId.current = uuid();
    setRoomId(RId.current)
    setRoomUpdate(!RoomUpdate)
    copy(RId.current)
    toast("Room Id is Copied to the Clipboard!");
  }

  const GoToChatBox = () => {
    if (RoomId && Name) {
      navigate('/Chatbox')

    }
    else {
      toast('Please Enter a Name and a Room Id. You can generate your own room Id or paste the room Id of someone else to join their room.')
    }
  }

  useEffect(() => {
    if (!RoomId) {
      navigate('/')
    }
  }, [RoomId])

  return (
    <tempMsgContext.Provider value={{ Name, RoomId, RoomUpdate }}>
      <Routes>
        <Route path="/" element={
          <div className='relative m-auto  md:w-[700px]'>
            <div className='absolute w-[70px] h-[30px] bg-white right-[70px] bottom-[210px]'></div>
            <img src="Logo (2).png" alt="logo" className='absolute w-[300px] right-5 bottom-[190px]' />
            <div className=' md:w-[600px] h-[250px] m-auto mt-[200px] sm: w-[350px] bg-[#3a3f50] rounded-lg shadow-lg shadow-gray-800 flex flex-col justify-center items-center gap-4'>

              <input type="text" name="Name" id="" placeholder='Enter Your Name' className='p-2 md:w-[400px] rounded-md w-[80%]' value={Name} onChange={(e) => setName(e.target.value)} />
              <input type="text" name="RoomId" id="" placeholder='Enter Room Id' className='p-2 md:w-[400px] rounded-md w-[80%]' value={RoomId} onChange={(e) => setRoomId(e.target.value)} />
              <div className='flex justify-between items-center md:w-[400px] w-[80%]'>
                <button className='w-[47%] h-[45px] bg-green-600 rounded-md text-white font-bold' onClick={() => GoToChatBox()}>Join Room</button>
                <button className='w-[47%] h-[45px] border-2 border-green-600 rounded-md text-white font-bold' onClick={() => { generateId() }}>Generate Id</button>
              </div>

            </div>

            <ToastContainer />

          </div>
        } />
        <Route path="/Chatbox" element={<Chatbox />} />
      </Routes>
    </tempMsgContext.Provider>
  )
}

export default App
