import type { User, VerificationToken } from '@prisma/client'
import { prisma } from '@/lib'

export const getVerificationTokenByToken = async (
	token: VerificationToken['token']
) => {
	const verificationToken = prisma.verificationToken.findUnique({
		where: { token },
	})
	return verificationToken
}

export const getVerificationTokenByEmail = async (email: User['email']) => {
	const verificationToken = prisma.verificationToken.findFirst({
		where: { email },
	})
	return verificationToken
}
