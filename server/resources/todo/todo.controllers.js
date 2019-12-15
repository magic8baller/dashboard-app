import Todo from './todo.model.js'

export const getAll = async (req, res) => {
	try {
		const todos = await Todo
			.find({createdBy: req.user._id})
			.sort('createdDate')

		res.status(200).send(todos)
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

export const createOne = async (req, res) => {
	const createdBy = req.user._id
	try {
		const doc = await Todo.create({...req.body, createdBy})
		res.status(201).json({data: doc})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

export const getOne = async (req, res) => {
	try {
		const todo = await Todo
			.findOne({createdBy: req.user._id, _id: req.params.id})
			.sort({date: -1})

		if (!todo) {
			return res.status(400).end()
		}

		res.status(200).json({data: todo, ...req.body})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

export const updateOne = async (req, res) => {
	try {
		const updatedDoc = await model
			.findOneAndUpdate(
				{
					createdBy: req.user._id,
					_id: req.params.id
				},
				req.body,
				{new: true}
			)


		if (!updatedDoc) {
			return res.status(400).end()
		}

		res.status(200).json({data: updatedDoc})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

export const removeOne = async (req, res) => {
	try {
		const removed = await Todo.findOneAndRemove({
			createdBy: req.user._id,
			_id: req.params.id
		})

		if (!removed) {
			return res.status(400).end('user does not exist in db')
		}

		return res.status(200).json({data: removed, success: true, message: 'deleted'})
	} catch (e) {
		console.error(e)
		res.status(500).end('Server Error')
	}
}