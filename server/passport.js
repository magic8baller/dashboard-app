import passportJwt from 'passport-jwt'
const {Strategy, ExtractJwt} = passportJwt
import mongoose from 'mongoose'
import User from './resources/user/user.model.js'
const keys = process.env.JWT_SECRET;

const opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		//console.log(jwt_payload);
		User.findById(jwt_payload.id)
			.then(user => {
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			})
			.catch(err => console.log(err));
	}));
}