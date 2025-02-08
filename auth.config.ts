import type { NextAuthConfig } from 'next-auth'
import bcryptjs from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { loginSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/services/auth'

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validateFields = loginSchema.safeParse(credentials)
				if (validateFields.success) {
					const { email, password } = validateFields.data

					const user = await getUserByEmail(email)
					if (!user || !user.password) return null

					const passwordMatch = await bcryptjs.compare(password, user.password)

					if (passwordMatch) return user
				}
				return null
			},
		}),
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
	],
} satisfies NextAuthConfig
