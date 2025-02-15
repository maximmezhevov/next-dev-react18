'use server'

import * as z from 'zod'
import { resetSchema } from '@/schemas/auth'
import { generatePasswordResetToken } from '@/lib'
import { sendPasswordResetEmail } from '@/lib/mails'
import { getUserByEmail } from '@/services/auth'

export const resetAction = async (values: z.infer<typeof resetSchema>) => {
	const validatedFields = resetSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email } = validatedFields.data
	const existingUser = await getUserByEmail(email)
	if (!existingUser) {
		return { error: 'Неверные учетные данные' }
	}

	const resetPasswordToken = await generatePasswordResetToken(email)

	await sendPasswordResetEmail(
		resetPasswordToken.email,
		resetPasswordToken.token
	)

	return { success: 'Проверьте электроную почту' }
}
