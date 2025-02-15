'use server'

import type { AvailableProviders } from '@/@types'
import { signIn } from '@/auth'

export const OAuthAction = async (
	provider: AvailableProviders,
	redirectTo: string
) => {
	await signIn(provider, { redirectTo: redirectTo })
}
