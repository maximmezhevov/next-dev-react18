'use server'

import * as z from 'zod'
import { ResetSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'
import { generatePasswordResetToken } from '@/lib'
import { sendPasswordResetEmail } from '@/lib/mails'

export const resetAction = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid email' }
	}

	const { email } = validatedFields.data
	const existingUser = await getUserByEmail(email)
	if (!existingUser) {
		return { error: 'email not faund' }
	}

	const resetPasswordToken = await generatePasswordResetToken(email)

	await sendPasswordResetEmail(
		resetPasswordToken.email,
		resetPasswordToken.token
	)

	return { success: 'проверьте электроную почту' }
}
