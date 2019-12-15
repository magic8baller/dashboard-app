import dotenv from 'dotenv'
import jwtMiddleware from 'express-jwt'
import jwt from 'jsonwebtoken'
import User from '../resources/user/user.model.js'
dotenv.config()
const {JWT_EXP, JWT_SECRET} = process.env


export const newToken = user => {
	return jwt.sign({id: user._id}, JWT_SECRET, {
		expiresIn: '1d'
	})
}

// export const verifyToken = token =>
// 	new Promise((resolve, reject) => {
// 		jwt.verify(req.headers['x-access-token'], JWT_SECRET, (err, payload) => {
// 			if (err) {
// 				res.json({status: "error", message: err.message, data: null});
// 				return reject(err);
// 			}
// 			req.body.id = payload.id
// 			resolve(payload)
// 		})
// 	})

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


export const protect = jwtMiddleware	({secret: JWT_SECRET})


// 	const token = req.headers["x-access-token"];

// 	// Check if not token
// 	if (!token) {
// 		return res.status(401).json({msg: 'No token, authorization denied'});
// 	}

// 	// Verify token
// 	try {
// 		await jwt.verify(token, JWT_SECRET, (error, decoded) => {
// 			if (error) {
// 				res.status(401).json({msg: 'Token is not valid'});
// 			}
// 			else {
// 				req.user._id = decoded.id;
// 				next();
// 			}
// 		});
// 	} catch (err) {
// 		console.error('something wrong with auth middleware')
// 		res.status(500).json({msg: 'Server Error'});
// 	}

// }