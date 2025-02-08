'use server'

import type { VerificationToken } from '@prisma/client'
import { prisma } from '@/lib'
import { getUserByEmail, getVerificationTokenByToken } from '@/services/auth'

export const verificationAction = async (token: VerificationToken['token']) => {
	const existingToken = await getVerificationTokenByToken(token)
	if (!existingToken) {
		return { error: 'Токена не существует или срок действия токена истек' }
	}

	const hasExpired = new Date(existingToken.expires) < new Date()
	if (hasExpired) {
		return { error: 'Срок действия токена истек' }
	}

	const existingUser = await getUserByEmail(existingToken.email)
	if (!existingUser) {
		return { error: 'Пользователя не существует' }
	}

	await prisma.user.update({
		where: { id: existingUser.id },
		data: { emailVerified: new Date(), email: existingToken.email },
	})

	await prisma.verificationToken.delete({
		where: { id: existingToken.id },
	})

	return { success: 'Электронная почта подтверждена' }
}
