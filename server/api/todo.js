import express from 'express'
const router = express.Router()
import expressValidator from 'express-validator'
const {check, validationResult} = expressValidator
import Todo from '../resources/todo/todo.model.js'
import User from '../resources/user/user.model.js'
import auth from '../middleware/auth.js'
// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const todos = await Todo.find().sort({date: -1});
		res.json(todos);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/', auth, [
	auth,
	[
		check('text', 'Text is required')
			.not()
			.isEmpty()
	]
], async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const user = await User.findById(req.user._id).select('-password');
	try {
		const newTodo = await new Todo ({...req.body, createdBy: req.user._id})
		const todo = await newTodo.save()
		res.status(201).json({data: todo})
	} catch (e) {
		console.error(e)
		res.status(400).send('Server Error')
	}
})

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		// Check for ObjectId format and post
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
			return res.status(404).json({msg: 'Todo not found'});
		}

		res.json(todo);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

router.delete('/:id', auth, async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		// Check for ObjectId format and todo
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
			return res.status(404).json({msg: 'todo not found'});
		}

		// Check user
		if (todo.user.toString() !== req.user.id) {
			return res.status(401).json({msg: 'User not authorized'});
		}

		await todo.remove();

		res.json({msg: 'todo removed'});
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

export default router