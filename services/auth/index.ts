import type { User, VerificationToken } from '@prisma/client'
import { prisma } from '@/lib'

export const getUserByEmail = async (email: User['email']) => {
	const user = await prisma.user.findUnique({ where: { email } })
	return user
}

export const getUserById = async (id: User['id']) => {
	const user = await prisma.user.findUnique({ where: { id } })
	return user
}

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
