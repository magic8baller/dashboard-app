import express from 'express'
const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
	res.send(['neener', 'lol', 'kewla1d'])
})

export default userRouter

