import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import {signin, signup} from './utils/auth.js'
import cors from 'cors'
import todoRouter from './resources/todo/todo.router.js'
import userRouter from './resources/user/user.router.js'
import {connectDB} from './utils/db.js'
dotenv.config()
const {PORT} = process.env || 8080
const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)

app.get('/', (req, res) => res.send('3l3ktr0-k@rd10gr@mm'))

app.listen(PORT, () => console.log(`listening to api at http://localhost:${PORT}`))