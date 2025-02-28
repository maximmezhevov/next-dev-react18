'use server'

import * as z from 'zod'
import { registrationSchema } from '@/lib/zod/auth'
import { sanitizeEmail, sanitizeName } from '@/lib/validator'
import { getUserByEmail } from '@/lib/services/auth'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

export const registrationAction = async (values: z.infer<typeof registrationSchema>) => {
	const validatedFields = registrationSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const name = sanitizeName(validatedFields.data.name)
	const email = sanitizeEmail(validatedFields.data.email)
	const password = validatedFields.data.password

	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return {
			error: 'Электронная почта уже зарегистрирована или используется другим провайдером',
		}
	}

	const hashedPassword = await bcryptjs.hash(password, 10)

	try {
		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})
		return {
			success: 'Регистрация прошла успешно',
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log('Ошибка:', error)
			return { error: 'Что-то пошло не так!' }
		} else {
			console.log('Неизвестная ошибка:', error)
			return { error: 'Что-то пошло не так (Неизвестная ошибка)!' }
		}
	}
}
