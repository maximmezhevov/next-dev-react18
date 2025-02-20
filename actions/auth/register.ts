'use server'

import * as z from 'zod'
import { registerSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib'

// import { generateVerificationToken } from '@/lib'
// import { sendVerificationEmail } from '@/lib/mails'

export const registerAction = async (
	values: z.infer<typeof registerSchema>
) => {
	const validatedFields = registerSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { name, email, password } = validatedFields.data

	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return {
			error:
				'Электронная почта уже зарегистрирована или используется другим провайдером',
		}
	}

	const hashedPassword = await bcryptjs.hash(password, 10)

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	// const verificationToken = await generateVerificationToken(email)
	// await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return {
		//	success: 'Требуется подтверждения по электронной почте'
		success: 'Регистрация прошла успешно',
	}
}
