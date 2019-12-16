import express from 'express'
import * as todoControllers from './todo.controllers.js'
const todoRouter = express.Router()

todoRouter.route('/')
	.get(todoControllers.getAll)
	.post(todoControllers.createOne)

todoRouter.route('/:id')
	.get(todoControllers.getOne)
	.put(todoControllers.updateOne)
	.delete(todoControllers.removeOne)

export default todoRouter