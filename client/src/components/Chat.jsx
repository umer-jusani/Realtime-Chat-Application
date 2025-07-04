import React, { useEffect, useState } from 'react'
import queryString from "query-string"
import io from 'socket.io-client';
import { useRef } from 'react';

const ENDPOINT = 'http://localhost:5000';

const Chat = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const socket = useRef()

    useEffect(() => {
        let { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

        socket.current = io(ENDPOINT);

        socket.current.emit('join', { name, room }, (response) => {
            console.log(response)
        })

        return () => {
            socket.current.off();
            socket.current.disconnect();
        }
    }, [ENDPOINT, location.search])


    useEffect(() => {
        socket.current.on("message", (message) => {
            setMessages([...messages, message])
        })
    }, [message]);


    function sendMessage(event) {
        event.preventDefault();

        if (message) {
            socket.current.emit("sendMessage", message, () => setMessage(""))
        }
    }

    console.log(messages, 'messages')


    return (
        <div className='outer-container'>
            <div className='container'>
                <input type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key == "Enter" ? sendMessage(event) : null}
                />
            </div>
        </div>
    )
}

export default Chat
