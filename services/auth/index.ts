import type { User } from '@prisma/client'
import { prisma } from '@/lib'

type Email = User['email']
type Id = User['id']

export const getUserByEmail = async (email: Email) => {
	const user = await prisma.user.findUnique({ where: { email } })
	return user
}

export const getUserById = async (id: Id) => {
	const user = await prisma.user.findUnique({ where: { id } })
	return user
}
