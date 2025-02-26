'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { OAuthAction } from '@/action/auth'

import type { Provider } from './server-action-button'

export const useOAuthServerAction = (provider: Provider) => {
	const [isPending, setIsPending] = useState(false)
	const searchParams = useSearchParams()

	const callbackUrl: string | undefined = searchParams.get('callbackUrl') ?? undefined
	const redirectUrl: string = callbackUrl || '/next-auth'

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
