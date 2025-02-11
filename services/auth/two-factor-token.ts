import { prisma } from '@/lib'
import { TwoFactorToken, User } from '@prisma/client'

export const getTwoFactorTokenByToken = async (
	token: TwoFactorToken['token']
) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findUnique({
			where: { token },
		})

		return twoFactorToken
	} catch {
		return null
	}
}

export const getTwoFactorTokenByEmail = async (email: User['email']) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findFirst({
			where: { email },
		})

		return twoFactorToken
	} catch {
		return null
	}
}
