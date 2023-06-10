import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

const Message = () => {
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");


    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", { message, room });
    };

    const sendNotificaton = () => {
        socket.emit('send_notification')
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
        socket.on("new_notification", (res) => {
            toast.success(res, 'new notification')
        })
    }, [socket]);

    return (
        <div className=' flex flex-col space-y-4 justify-center items-center mx-auto relative top-1/3 right-1/4 shadow-md p-20 shadow-gray-300'>
            <div>
                <input
                    className=' input input-primary'
                    placeholder="Room Number..."
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                />
                <button className='btn btn-primary' onClick={joinRoom}> Join Room</button>
            </div>
            <div>
                <input
                    className=' input input-secondary'
                    placeholder="Message..."
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                />
                <button className=' btn' onClick={sendMessage}> Send Message</button>
            </div>
            <h1> Message:</h1>
            <div className="chat chat-end">
                <div className="chat-bubble">{messageReceived}</div>
            </div>

        </div>
    )

};

export default Message;