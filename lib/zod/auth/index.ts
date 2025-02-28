import * as z from 'zod'

export const registrationSchema = z.object({
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
	name: z.string().min(1, { message: 'String must contain at least 1 character(s)' }),
})

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})
