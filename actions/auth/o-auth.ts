'use server'

import { signIn } from '@/lib/auth'

export async function OAuthAction(provider: 'github', redirectUrl?: string) {
	await signIn(provider, { redirect: true, redirectTo: redirectUrl })

	// TODO // ...
}
