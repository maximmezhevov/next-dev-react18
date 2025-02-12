'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { loginSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'

export const devLoginNoVerifAction = async (
	values: z.infer<typeof loginSchema>
) => {
	const validatedFields = loginSchema.safeParse(values)
	if (!validatedFields.success) {
		// return { error: 'invalid fields' }
		throw new Error('invalid fields')
	}
	const { email, password } = validatedFields.data

	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email || !existingUser.password) {
		// return { error: 'Неверные учетные данные' }
		throw new Error('Неверные учетные данные')
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/dev/next-auth',
		})
		return { success: 'Авторизация прошла успешно' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					// return { error: 'Неверные учетные данные' }
					throw new Error('Неверные учетные данные')
				default:
					// return { error: 'Что-то пошло не так' }
					throw new Error('Что-то пошло не так')
			}
		}
		throw error
	}
}
