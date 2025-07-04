const express = require("express");
const socketIo = require("socket.io");
const { createServer } = require("http");
const router = require("./router");
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require("./user");

const PORT = process.env.PORT || 5000;
const corsOptions = {
    credentials: true,
    methods: ["GET", "POST"],
    origin: ['http://localhost:5173']
};

const app = express();
const server = createServer(app);
const io = socketIo(server, {
    cors: corsOptions
})


app.use(router)
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    return res.json("Server is Up and Running")
})

io.on("connection", (socket) => {

    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        socket.emit("message", { user: "admin", text: `${user.name}, welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined the room` })

        socket.join(user.room);

        callback({ message: "User added to the room" });
    })


    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        console.log(user, "user");

        io.to(user.room).emit("message", { user: user.name, text: message })
        callback();
    })


    socket.on("disconnect", (reason) => {
        console.log("User had Left!!")
        console.log(removeUser(socket.id))
    });


});




server.listen(PORT, () => console.log(`Server is listening on this port ${PORT}`));