'use server'

import * as z from 'zod'
import bcrypt from 'bcrypt'
import { RegisterSchema } from '@/schemas/auth'
import { prisma } from '@/lib'
import { getUserByEmail } from '@/services/auth'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invali fields' }
	}

	const { name, email, password } = validatedFields.data
	const hashedPassword = await bcrypt.hash(password, 10)

	// const existingUser = await prisma.user.findUnique({ where: { email } })
	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return { error: 'Такая электронная почта уже используется!' }
	}

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	return { success: 'Регистрация прошла успешно!' }
}
