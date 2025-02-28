'use server'

import * as z from 'zod'
import { signInSchema } from '@/lib/zod/auth'
import { sanitizeEmail } from '@/lib/validator'
import { getUserByEmail } from '@/lib/services/auth'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

export const signInAction = async (values: z.infer<typeof signInSchema>) => {
	const validatedFields = signInSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const email = sanitizeEmail(validatedFields.data.email)
	const password = validatedFields.data.password

	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Неверные учетные данные!' }
	}

	try {
		await signIn('credentials', { email, password, redirect: false })
		return { success: 'Авторизация прошла успешно!' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin': {
					console.log('Неверные учетные данные!:', error)
					return { error: 'Неверные учетные данные!' }
				}

				default: {
					console.log('Ошибка:', error)
					return { error: 'Что-то пошло не так!' }
				}
			}
		}

		if (error instanceof Error) {
			console.log('Ошибка:', error)
			return { error: 'Что-то пошло не так!' }
		} else {
			console.log('Неизвестная ошибка:', error)
			return { error: 'Что-то пошло не так (Неизвестная ошибка)!' }
		}
	}
}
