'use client'

import { useState } from 'react'
import { useWatchCallback } from '@/hooks'
import { OAuthAction } from '@/action/auth'

import type { Provider } from './server-action-button'

export const useOAuthServerAction = (provider: Provider) => {
	const [isPending, setIsPending] = useState(false)

	const { callbackUrl } = useWatchCallback()

	const redirectUrl = callbackUrl || 'next-auth'

	const handleOAuthServerAction = async () => {
		setIsPending(true)

		await OAuthAction(provider, redirectUrl)

		/*
			TODO

			...
		
		*/
	}

	return {
		isPending,
		handleOAuthServerAction,
	}
}
