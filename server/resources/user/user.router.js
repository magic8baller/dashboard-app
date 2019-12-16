import express from 'express'
const userRouter = express.Router()
import {me, updateMe} from './user.controllers.js'
userRouter.get('/', (req, res, next) => {
	res.send(['neener', 'lol', 'kewla1d'])
})
userRouter.get('/', me)
userRouter.put('/', updateMe)


export default userRouter