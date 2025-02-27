'use server'

import * as z from 'zod'
import { LoginSchema } from '@/lib/zod/auth'
import { prisma } from '@/lib/prisma'
import { signIn } from '@/lib/auth'

export async function signInAction(values: z.infer<typeof LoginSchema>) {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	const { email, password } = validatedFields.data

	const user = await prisma.user.findFirst({ where: { email } })
	if (!user || !user.email) {
		return { error: 'Неверные учетные данные' }
	}

	await signIn('credentials', {
		email,
		password,
	})
}
