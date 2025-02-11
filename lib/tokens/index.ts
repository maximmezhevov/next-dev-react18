import type { User } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import crypto from 'crypto'
import { prisma } from '@/lib'
import {
	getVerificationTokenByEmail,
	getPasswordResetTokenByEmail,
	getTwoFactorTokenByEmail,
} from '@/services/auth'

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

export const generatePasswordResetToken = async (email: User['email']) => {
	const token = uuid()
	const expires = new Date(new Date().getTime() + 3600 * 1000)

	const existingToken = await getPasswordResetTokenByEmail(email)
	if (existingToken) {
		await prisma.passwordResetToken.delete({ where: { id: existingToken.id } })
	}

	const passwordResetToken = prisma.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return passwordResetToken
}

export const generateTwoFactorToken = async (email: User['email']) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString()
	const expires = new Date(new Date().getTime() + 3600 * 1000)

	const existingToken = await getTwoFactorTokenByEmail(email)
	if (existingToken) {
		await prisma.twoFactorToken.delete({ where: { id: existingToken.id } })
	}

	const twoFactorToken = prisma.twoFactorToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return twoFactorToken
}
