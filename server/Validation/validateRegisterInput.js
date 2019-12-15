import Validator from 'validator'
import {isEmpty} from './isEmpty.js'
import User from '../resources/user/user.model.js'
export const validateRegisterInput = (data) => {
	let errors = {};
	let {username, email, password, password2} = data;

	username = !isEmpty(username) ? username : '';
	email = !isEmpty(email) ? email : '';
	password = !isEmpty(password) ? password : '';
	password2 = !isEmpty(password2) ? password2 : '';

	if (!Validator.isLength(username, {min: 2, max: 30})) {
		errors.username = 'Username must be between 2 and 30 characters';
	}

	if (Validator.isEmpty(username)) {
		errors.username = 'Username is required';
	}

	if (username.indexOf(' ') > -1) {
		errors.username = 'Spaces are not allowed in Username';
	}

	if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(email)) {
		errors.email = 'Email is required';
	}

	if (email.indexOf(' ') > -1) {
		errors.email = 'Spaces are not allowed in Email';
	}

	if (!Validator.isLength(password, {min: 6})) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (Validator.isEmpty(password)) {
		errors.password = 'Password field is empty';
	}

	if (password.indexOf(' ') > -1) {
		errors.password = 'Spaces are not allowed in Password';
	}

	if (Validator.isEmpty(password2)) {
		errors.password2 = 'Confirm Password field is empty';
	}

	if (!Validator.equals(password, password2)) {
		errors.password2 = 'Passwords must match';
	}

	if (password2.indexOf(' ') > -1) {
		errors.password2 = 'Spaces are not allowed in Password';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}