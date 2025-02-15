'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { loginSchemaNoVerif } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'

export const loginActionNoVerif = async (
	values: z.infer<typeof loginSchemaNoVerif>
) => {
	const validatedFields = loginSchemaNoVerif.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email, password } = validatedFields.data
	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Неверные учетные данные' }
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirect: false,
		})
		return { success: 'Авторизация прошла успешно' }
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
