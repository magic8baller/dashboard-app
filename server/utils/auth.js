import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../resources/user/user.model.js'
dotenv.config()

const {JWT_EXP, JWT_SECRET} = process.env


export const newToken = user => {
	return jwt.sign({id: user._id}, JWT_SECRET, {
		expiresIn: '1d'
	})
}

export const verifyToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, payload) => {
			if (err) return reject(err)
			resolve(payload)
		})
	})

export const signup = async (req, res, next) => {
	const {email, password} = req.body
	if (!email) {
		return res.send({
			success: false,
			message: 'Email cannot be blank.'
		});
	}
	if (!password) {
		return res.send({
			success: false,
			message: 'Password cannot be blank.'
		});
	}

	try {
		let foundUser = await User.findOne({email});

		if (foundUser) {
			return res
				.status(422)
				.send({message: 'User already exists', success: false});
		}
		const user = new User({email, password})
	user.save(function (err) {
			if (err) return next(err)
			const token = newToken(user)
			return res.status(201).send({token, user})
		})
	} catch (error) {
		console.error(error)
		res.status(500).send('Server Error')
	}
}

export const signin = async (req, res, next) => {
	const {email, password} = req.body

	if (!email || !password) {
		return res.status(400).send({message: 'need email and password'})
	}

	const invalid = {message: 'Invalid email and passoword combination'}

	try {
		const user = await User.findOne({email})
			.select('email password')
			.exec()

		if (!user) {
			return res.status(401).send(invalid)
		}
		const match = await user.checkPassword(req.body.password)

		if (!match) {
			return res.status(401).send(invalid)
		}
		const token = newToken(user)
		return res.status(201).send({token, user})
	} catch (error) {
		console.error(error)
	}
}


export const protect = async (req, res, next) => {
	const bearer = req.headers.authorization

	if (!bearer || !bearer.startsWith('Bearer ')) {
		return res.status(401).end()
	}

	const token = bearer.split('Bearer ')[1].trim()
	let payload
	try {
		payload = await verifyToken(token)
	} catch (e) {
		return res.status(401).end()
	}

	const user = await User.findById(payload.id)
		.select('-password')
		.lean()
		.exec()

	if (!user) {
		return res.status(401).end()
	}

	req.user = user
	next()
}