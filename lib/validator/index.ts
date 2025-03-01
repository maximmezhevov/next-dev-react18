import validator from 'validator'

export const sanitizeName = (name: string) => {
	return validator.escape(validator.trim(name))
}

export const sanitizeEmail = (email: string) => {
	return validator.escape(validator.normalizeEmail(validator.trim(email)) || '')
}
