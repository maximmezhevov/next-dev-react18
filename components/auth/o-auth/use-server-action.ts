'use client'

import { useState } from 'react'
import { useCallbackUrl } from '@/hooks'
import { OAuthAction } from '@/actions/auth'

import type { Provider } from './server-action-button'

export const useOAuthServerAction = (provider: Provider) => {
	const [isPending, setIsPending] = useState(false)

	const { callback } = useCallbackUrl()

	const redirectUrl = callback || 'next-auth'

	const handleOAuthServerAction = async () => {
		setIsPending(true)

		await OAuthAction(provider, redirectUrl)

		// TODO // ...
	}

	return {
		isPending,
		handleOAuthServerAction,
	}
}
