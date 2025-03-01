import * as z from 'zod'

// TODO // доделать валидацию

export const registrationSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
	name: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
})

export const signInSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
})

export const resetPasswordSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
	confirmPassword: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
})

/* TODO
	// Schema for password validation
	const resetPasswordSchema = z
		.object({
			password: z
				.string()
				.min(6, { message: 'Password must be at least 6 characters long' })
				.regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			path: ['confirmPassword'],
			message: 'Passwords do not match',
		})
*/
