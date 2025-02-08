'use server'

import type { PasswordResetToken } from '@prisma/client'
import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib'
import { newPasswordSchema } from '@/schemas/auth'
import { getPasswordResetTokenByToken, getUserByEmail } from '@/services/auth'

export const newPasswordAction = async (
	values: z.infer<typeof newPasswordSchema>,
	token: PasswordResetToken['token'] | null
) => {
	if (!token) {
		return { error: 'missing token' }
	}

	const validatedFields = newPasswordSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid email' }
	}

	const { password } = validatedFields.data

	const existingToken = await getPasswordResetTokenByToken(token)
	if (!existingToken) {
		return { error: 'недопустимый токен' }
	}

	const hasExpired = new Date(existingToken.expires) < new Date()
	if (hasExpired) {
		return { error: 'Срок действия токена истек' }
	}

	const existingUser = await getUserByEmail(existingToken.email)
	if (!existingUser) {
		return { error: 'Такой электронной почты не существует' }
	}

	const hashesPassword = await bcryptjs.hash(password, 10)

	await prisma.user.update({
		where: { id: existingUser.id },
		data: { password: hashesPassword },
	})

	await prisma.passwordResetToken.delete({
		where: { id: existingToken.id },
	})

	return { success: 'Пароль был изменен' }
}
