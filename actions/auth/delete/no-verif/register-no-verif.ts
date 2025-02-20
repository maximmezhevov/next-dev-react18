'use server'

import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { registerSchema } from '@/schemas/auth'
import { prisma } from '@/lib'
import { getUserByEmail } from '@/services/auth'

export const registerActionNoVerif = async (
	values: z.infer<typeof registerSchema>
) => {
	const validatedFields = registerSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { name, email, password } = validatedFields.data

	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return {
			error:
				'Электронная почта уже зарегистрирована или используется другим провайдером',
		}
	}

	const hashedPassword = await bcryptjs.hash(password, 10)

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	return { success: 'Регистрация прошла успешно' }
}
