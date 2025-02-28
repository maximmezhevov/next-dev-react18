'use server'

import * as z from 'zod'
import { registrationSchema } from '@/lib/zod/auth'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

export const registrationAction = async (values: z.infer<typeof registrationSchema>) => {
	const validatedFields = registrationSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}
	const { name, email, password } = validatedFields.data

	const existingUser = await prisma.user.findFirst({ where: { email } })
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
			console.log('Error:', error)
			return { error: 'Something went wrong!' }
		} else {
			console.log('Unknown error occurred:', error)
			return { error: 'An unknown error occurred!' }
		}
	}
}
