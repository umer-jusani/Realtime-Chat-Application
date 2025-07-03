const express = require("express");
const socketIo = require("socket.io");
const { createServer } = require("http");
const router = require("./router");
const cors = require('cors');

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
    console.log("we have a new connection!!")

    socket.on("disconnect", (reason) => {
        console.log("User had Left!!")
    });
});




server.listen(PORT, () => console.log(`Server is listening on this port ${PORT}`));