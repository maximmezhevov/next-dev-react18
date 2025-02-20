'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { loginSchema } from '@/schemas/auth'
import { generateTwoFactorToken, prisma } from '@/lib'
import { sendTwoFactorEmail } from '@/lib/mails'
import {
	getTwoFactorConfirmationByUserId,
	getTwoFactorTokenByEmail,
	getUserByEmail,
} from '@/services/auth'

// import { generateVerificationToken } from '@/lib'
// import { sendVerificationEmail } from '@/lib/mails'

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
	const validatedFields = loginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email, password, twoFactorCode } = validatedFields.data

	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Неверные учетные данные' }
	}

	// if (!existingUser.emailVerified) {
	// 	const verificationToken = await generateVerificationToken(
	// 		existingUser.email
	// 	)

	// 	await sendVerificationEmail(
	// 		verificationToken.email,
	// 		verificationToken.token
	// 	)

	// 	return { success: 'Требуется подтверждения по электронной почте' }
	// }

	if (existingUser.twoFactor && existingUser.email) {
		if (twoFactorCode) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
			if (!twoFactorToken) {
				return { error: 'invalid 2FA code' }
			}

			if (twoFactorToken.token !== twoFactorCode) {
				return { error: 'invalid 2FA code' }
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date()
			if (hasExpired) {
				return { error: '2FA code expired' }
			}

			await prisma.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			)
			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				})
			}

			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)

			await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token)

			return {
				success: '2FA код отправлен на электронную почту',
				showtwoFactor: true,
			}
		}
	}

	try {
		await signIn('credentials', { email, password, redirect: false })
		return {
			redirect: true,
			success: existingUser.twoFactor
				? '2FA/Авторизация прошла успешно'
				: 'Авторизация прошла успешно',
		}
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
