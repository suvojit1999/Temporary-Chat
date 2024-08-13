import React, { useContext, useEffect, useRef, useState } from 'react'
import './chatbox.css'
import { tempMsgContext } from '../_context/tempMsgContext'
import { io } from 'socket.io-client'


const Chatbox = () => {
    const { Name, RoomId, RoomUpdate } = useContext(tempMsgContext)
    const [MyMessege, setMyMessege] = useState('')
    const socketRef = useRef(null);



    useEffect(() => {
        // Initialize socket connection only once
        if (!socketRef.current) {
            socketRef.current = io('temporary-chat-hazel.vercel.app');

            socketRef.current.on('connect', () => {
                // Handle connection
            });

            // if (RoomId) {
            //     socketRef.current.emit('join-room', RoomId, Name);
            //   }

            socketRef.current.on('notify', msg => {
                displayBotMessage(msg)
            })

            socketRef.current.on('receive-msg', msgData => {
                if (msgData) {
                    displayGetMessgae(msgData);
                }
            });
        }

    }, []);

    useEffect(() => {
        if (RoomId) {
            socketRef.current.emit('join-room', RoomId, Name);
        }
        // room.current = RoomId;
    }, [RoomUpdate]);

    

    const sendMessege = () => {
        const msgData = {
            sender_name: Name,
            msg: MyMessege
        }
        if (MyMessege) {
            socketRef.current.emit('send-message', msgData, RoomId);
        }
        displayMyMessgae(MyMessege)
        setMyMessege('')
    }

    const displayGetMessgae = (messageData) => {
        const data = `
        <div class='Message_box_2'>
            <div class='Sender_Name'>${messageData.sender_name}</div>
            <div class='Get_Message'>${messageData.msg}</div>
          </div>
        `
        document.getElementById('message-box').insertAdjacentHTML('beforeend', data)

        requestAnimationFrame(() => {
            document.getElementById('message-box').lastElementChild.scrollIntoView({ behavior: 'smooth' });
        });
    }
    const displayMyMessgae = (message) => {
        if (message) {
            const data = `
          <div class='Message_box_1'>
              <div class='My_Name'>You</div>
              <div class='My_Message'>${message}</div>
            </div>
          `
            document.getElementById('message-box').insertAdjacentHTML('beforeend', data)

            document.getElementById('message-box').lastElementChild.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const displayBotMessage = (botmessage) => {
        const data = `
        <div class='Message_box_2'>
            <div class='Sender_Name'>Bot</div>
            <div class='Get_Message'>${botmessage}</div>
          </div>
        `
        document.getElementById('message-box').insertAdjacentHTML('beforeend', data)

        requestAnimationFrame(() => {
            document.getElementById('message-box').lastElementChild.scrollIntoView({ behavior: 'smooth' });
        });
    }
    return (
  
                <div className='relative m-auto md:w-[74vw]'>
                    <div className='absolute w-[70px] h-[30px] bg-white right-[50px] bottom-[480px]'></div>
                    <img src="Logo (2).png" alt="logo" className='absolute w-[300px] right-0 bottom-[460px]' />

                    <div id='message-box' className='md:w-[70vw] w-[90vw] h-[450px] m-auto mt-[120px] p-4 flex flex-col overflow-y-auto rounded-lg bg-[#3a3f50] shadow-gray-800'>

                        <div className='flex flex-col justify-start'>
                            <div className=' ml-1 text-gray-500 font-semibold'>Bot</div>
                            <div className='p-2 bg-blue-300 rounded-lg my-2 max-w-[50%]'>You joined the room:  {RoomId}</div>

                        </div>


                    </div>

                    <div className='md:w-[70vw] w-[90vw] m-auto mt-5 flex justify-between items-center mb-4'>
                        <input type="text" name="TypeMessege" id="" className='border-2 border-gray-500 outline-none rounded-lg p-2 w-[82%] h-[50px]' value={MyMessege} onChange={(e) => setMyMessege(e.target.value)} />
                        <button className='w-[15%] h-[50px] bg-green-600 rounded-lg p-2 font-bold text-white' onClick={() => sendMessege()}>Send</button>
                    </div>
                </div>

    )
}

export default Chatbox
