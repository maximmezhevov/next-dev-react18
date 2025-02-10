'use server'

import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib'
import { newPasswordNoVerifSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'

export const passwordResetNoVerifAction = async (
	values: z.infer<typeof newPasswordNoVerifSchema>
) => {
	const validatedFields = newPasswordNoVerifSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email, password, passwordDuplicate } = validatedFields.data

	if (password !== passwordDuplicate) {
		return { error: 'Пароли не совпадают' }
	}

	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Неверные учетные данные' }
	}

	const hashesPassword = await bcryptjs.hash(password, 10)

	await prisma.user.update({
		where: { id: existingUser.id },
		data: { password: hashesPassword },
	})

	return { success: 'Новый пароль сохранен' }
}
