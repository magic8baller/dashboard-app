import Validator from 'validator'
import {isEmpty} from './isEmpty'

export const validatePostInput = (data) => {
	let errors = {};
	let {text} = data;

	text = !isEmpty(text) ? text : '';

	if (Validator.isEmpty(text)) {
		errors.text = 'Text field is empty';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}