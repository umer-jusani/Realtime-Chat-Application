import React, { useEffect, useState } from 'react'
import queryString from "query-string"
import io from 'socket.io-client';

let socket;
const ENDPOINT = 'http://localhost:5000';

const Chat = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    useEffect(() => {
        let { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);


        

        return () => {
            socket.off();
            socket.disconnect();
        }
    }, [])


    return (
        <div>
            Chat
        </div>
    )
}

export default Chat
