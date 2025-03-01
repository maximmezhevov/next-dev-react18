'use server'

import * as z from 'zod'
import { resetPasswordSchema } from '@/lib/zod/auth'
import { sanitizeEmail } from '@/lib/validator'
import { getUserByEmail } from '@/lib/services/auth'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const resetPasswordAction = async (values: z.infer<typeof resetPasswordSchema>) => {
	const validatedFields = resetPasswordSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const email = sanitizeEmail(validatedFields.data.email)
	const password = validatedFields.data.password
	const confirmPassword = validatedFields.data.confirmPassword

	if (password !== confirmPassword) {
		return { error: 'Пароли не совпадают' }
	}

	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Неверные учетные данные' }
	}

	const hashesPassword = await bcryptjs.hash(password, 10)

	try {
		await prisma.user.update({
			where: { id: existingUser.id },
			data: { password: hashesPassword },
		})
		return { success: 'Новый пароль сохранен' }
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
