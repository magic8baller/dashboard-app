import User from './user.model.js'


/**
 * GET api/users
 * @desc Current user route
 * @access public
 */
export const me = (req, res) => {
	res.status(200).send('i see dead users')
	// res.status(200).json({data: req.user})
}

/**
 * PUT api/users
 * @desc Update Current User
 * @access public
 */
export const updateMe = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true
		})
			.lean()
			.exec()

		res.status(200).json({data: user})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}