import express from 'express'
import * as todoControllers from './todo.controllers.js'
const todoRouter = express.Router()
import {protect} from '../../utils/auth.js'

/**
 * @route /api/todo
 * @desc main todo routes
 * @access private
 */

todoRouter
	.route('/')
	.get(todoControllers.getAll, protect)
	// .get(todoControllers.getOne)
	.post(todoControllers.createOne)


/**
 * @route /api/todo
 * @desc todo routes by ID
 * @access private
 */

todoRouter
	.route('/todo/:id')
	.get(todoControllers.getOne)
	.put(todoControllers.updateOne)
	.delete(todoControllers.removeOne)

export default todoRouter