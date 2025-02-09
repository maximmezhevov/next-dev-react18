'use server'

import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib'
import { newPasswordWithoutVerificationSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'

export const passwordResetWithoutVerificationAction = async (
	values: z.infer<typeof newPasswordWithoutVerificationSchema>
) => {
	const validatedFields = newPasswordWithoutVerificationSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email, password } = validatedFields.data

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
