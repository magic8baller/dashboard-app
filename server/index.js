import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import userRouter from './router.js'
import {signup, signin, protect} from './utils/auth.js'
import {connectDB} from './utils/db.js'
const {PORT} = process.env || 8080
const app = express()

connectDB()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
// app.use('/api/todo', todoRouter)
app.get('/', (req, res) => {
	if (res.status('200')) {
		res.send('warm leatherette')
	} else {
		res.end('server error')
	}
})

app.listen(PORT, () => {
	console.log(`now running API on http://localhost:${PORT}`)
})