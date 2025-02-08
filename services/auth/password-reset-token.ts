import type { User, VerificationToken } from '@prisma/client'
import { prisma } from '@/lib'

export const getPasswordResetTokenByToken = async (
	token: VerificationToken['token']
) => {
	try {
		const passwordResetToken = await prisma.passwordResetToken.findUnique({
			where: {
				token,
			},
		})
		return passwordResetToken
	} catch {
		return null
	}
}

export const getPasswordResetTokenByEmail = async (email: User['email']) => {
	try {
		const passwordResetToken = await prisma.passwordResetToken.findFirst({
			where: {
				email,
			},
		})
		return passwordResetToken
	} catch {
		return null
	}
}
