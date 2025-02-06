'use server'

import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { RegisterSchema } from '@/schemas/auth'
import { prisma } from '@/lib'
import { getUserByEmail } from '@/services/auth'
import { signIn } from '@/auth'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invali fields' }
	}

	const { name, email, password } = validatedFields.data
	const hashedPassword = await bcryptjs.hash(password, 10)

	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return {
			error:
				'Такая электронная почта уже ранее зарегистрирована или возможно используется другим провайдером',
		}
	}

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	await signIn('credentials', {
		email,
		password,
		redirectTo: '/dev/next-auth',
	})

	return { success: 'success' } // Регистрация прошла успешно!
}
