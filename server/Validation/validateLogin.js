import Validator from 'validator'
import {isEmpty} from './isEmpty'
export const validateLoginInput = (data) => {
	let errors = {};
	let loginType;
	let {login, password} = data;

	login = !isEmpty(login) ? login : '';
	password = !isEmpty(password) ? password : '';

	if (Validator.isEmail(login)) {
		loginType = 'email';
	} else {
		loginType = 'username';
	}

	if (Validator.isEmpty(login)) {
		errors.login = 'Please enter username or email';
	}

	if (Validator.isEmpty(password)) {
		errors.password = 'Password field is empty';
	}

	return {
		errors,
		loginType,
		isValid: isEmpty(errors)
	}
}