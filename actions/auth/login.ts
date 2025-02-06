'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { LoginSchema } from '@/schemas/auth'
import { signIn } from '@/auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'Недопустимые поля' }
	}

	const { email, password } = validatedFields.data

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/dev/next-auth',
		})
		return { success: 'success' } // Успешно
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Неверные учетные данные' }
				default:
					return { error: 'Что-то пошло не так' }
			}
		}
		throw error
	}
}
