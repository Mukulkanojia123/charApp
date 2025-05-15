import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./utlis/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from 'http'
import { v4 as uuid } from "uuid";
import cors from "cors";
import { createUser } from "./seeders/user.js";
import { createGroupChats, createSingleChats } from "./seeders/chat.js";
import { v2 as cloudinary } from "cloudinary";



import userRouter from './routes/user.js'
import chatRouter from './routes/chat.js'
import adminRoute from './routes/admin.js'
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
    path: "./.env"
})


const app = express();
const server = createServer(app)
const io = Server(server)

const mongoUri = process.env.MONGO_URI
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";
const userSocketIDs = new Map();
const onlineUsers = new Set();

connectDB(mongoUri)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createUser(10);
// createGroupChats(10)
// createSingleChats(10)

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin : ['http://localhost:5173', 'http://localhost:5173', process.env.CLIENT_URL],
    credentials : true
}))
// app.use(express.urlencoded())

app.use('/api/v1/user', userRouter)
app.use('api/v1/chat', chatRouter)
app.use('api/v1/admin', adminRoute)


// Error Handling Middleware
app.use(errorMiddleware)



//Socket Handling

io.use((socket, next) => {
    cookieParser()(
      socket.request,
      socket.request.res,
      async (err) => await socketAuthenticator(err, socket, next)
    );
  });

io.on('connection', (socket) => {

    const user = socket.user;
    userSocketIDs.set(user._id.toString(), socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {

        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        };
        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
            await Message.create(messageForDB);
        } catch (error) {
            throw new Error(error);
        }
    })

    socket.on("disconnect", () => {
        console.log("user is disconnected")
        userSocketIDs.delete(user._id.toString())
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs };