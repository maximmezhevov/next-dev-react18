'use server'

import type { PasswordResetToken } from '@prisma/client'
import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib'
import { newPasswordSchema } from '@/schemas/auth'
import { getPasswordResetTokenByToken, getUserByEmail } from '@/services/auth'

export const passwordResetAction = async (
	values: z.infer<typeof newPasswordSchema>,
	token: PasswordResetToken['token'] | null
) => {
	if (!token) {
		return { error: 'Отсутствует токен' }
	}

	const validatedFields = newPasswordSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { password } = validatedFields.data

	const existingToken = await getPasswordResetTokenByToken(token)
	if (!existingToken) {
		return { error: 'Токена не существует или срок действия токена истек' }
	}

	const hasExpired = new Date(existingToken.expires) < new Date()
	if (hasExpired) {
		return { error: 'Срок действия токена истек' }
	}

	const existingUser = await getUserByEmail(existingToken.email)
	if (!existingUser) {
		return { error: 'Неверные учетные данные' }
	}

	const hashesPassword = await bcryptjs.hash(password, 10)

	await prisma.user.update({
		where: { id: existingUser.id },
		data: { password: hashesPassword },
	})

	await prisma.passwordResetToken.delete({
		where: { id: existingToken.id },
	})

	return { success: 'Новый пароль сохранен' }
}
