'use server'

import * as z from 'zod'
import { resetSchema } from '@/schemas/auth'
import { generatePasswordResetToken } from '@/lib'
import { getUserByEmail } from '@/services/auth'

export const resetImitAction = async (values: z.infer<typeof resetSchema>) => {
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

	return {
		// warning: '',
		token: resetPasswordToken.token,
	}
}
