import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'
import routes from './routes/index'
import { expressLogger } from './config/logger'
import { ErrorController } from './controllers/error'
import { langMiddleware } from './middleware/lang'
import { WebSocketServer } from "ws";

const app = express()
let server = http.createServer(app)
const io = new Server(server);

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLogger())
app.use(langMiddleware)

io.on('connection', (socket: Socket) => {
    console.log('A user connected');
  
    socket.on('chat message', (msg: string) => {
      console.log('Received message:', msg);
      io.emit('chat message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

app.use('/api', routes)

app.get('/status', (req: Request, res: Response) => {
    res.json({
        status: 'OK'
    })
})



const errorController = new ErrorController()
app.use(errorController.handle)

export default server
