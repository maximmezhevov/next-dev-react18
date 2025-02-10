'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { loginSchema } from '@/schemas/auth'
import { generateVerificationToken } from '@/lib'
import { sendVerificationEmail } from '@/lib/mails'
import { getUserByEmail } from '@/services/auth'

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
	const validatedFields = loginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email, password } = validatedFields.data
	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Неверные учетные данные' }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		)

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)

		return { success: 'Требуется подтверждения по электронной почте' }
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
					return { error: 'Неверные учетные данные' }
				default:
					return { error: 'Что-то пошло не так' }
			}
		}
		throw error
	}
}
