'use server'

import { prisma } from '@/lib/prisma'

export async function registrationAction() {
	await prisma.user.create({
		data: { email: 'example@email.com', password: '123' },
	})
	return
}
