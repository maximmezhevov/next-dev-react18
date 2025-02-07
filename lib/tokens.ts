import type { User } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { getVerificationTokenByEmail } from '@/services/auth'
import { prisma } from './prisma'

export const generateVerificationToken = async (email: User['email']) => {
	const token = uuid()
	const expires = new Date(new Date().getTime() + 3600 * 1000)

	const existingToken = await getVerificationTokenByEmail(email)
	if (existingToken) {
		await prisma.verificationToken.delete({ where: { id: existingToken.id } })
	}

	const verificationToken = prisma.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return verificationToken
}
