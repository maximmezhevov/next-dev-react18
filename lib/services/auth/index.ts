import type { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const getUserByEmail = async (email: User['email']) => {
	const user = await prisma.user.findUnique({ where: { email } })
	return user
}

export const getUserById = async (id: User['id']) => {
	const user = await prisma.user.findUnique({ where: { id } })
	return user
}
