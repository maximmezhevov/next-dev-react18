'use server'

import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { RegisterSchema } from '@/schemas/auth'
import { generateVerificationToken, prisma } from '@/lib'
import { getUserByEmail } from '@/services/auth'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'invali fields' }
	}

	const { name, email, password } = validatedFields.data
	const existingUser = await getUserByEmail(email)

	const hashedPassword = await bcryptjs.hash(password, 10)

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

	const verificationToken = await generateVerificationToken(email)

	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { success: 'Подтверждение по электронной почте' }
}
