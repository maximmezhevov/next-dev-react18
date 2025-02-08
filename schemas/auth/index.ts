import * as z from 'zod'

export const loginSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z
		.string()
		.min(1, { message: 'String must contain at least 1 character(s)' }),
})

export const registerSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z
		.string()
		.min(1, { message: 'String must contain at least 1 character(s)' }),
	name: z
		.string()
		.min(1, { message: 'String must contain at least 1 character(s)' }),
})

export const resetSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
})

export const newPasswordSchema = z.object({
	password: z
		.string()
		.min(1, { message: 'String must contain at least 1 character(s)' }),
})
