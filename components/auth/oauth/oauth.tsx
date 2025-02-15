'use client'

import type { AvailableProviders } from '@/@types'
import { useTransition } from 'react'
import { OAuthAction } from '@/actions/auth'
import { SubmitButton } from '@/components/ui'
import { IconMap, LabelMap } from './constants'
import { useSearchParams } from 'next/navigation'

const DEFAULT_REDIRECT = '/dev/next-auth'

export const OAuth: React.FC<{
	provider: AvailableProviders
}> = ({ provider }) => {
	const [isPending, startTransition] = useTransition()

	const searchParams = useSearchParams()
	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl ? getCallbackUrl : DEFAULT_REDIRECT

	const onClick = async () => {
		startTransition(() => {
			OAuthAction(provider, callbackUrl)
		})
	}

	return (
		<SubmitButton onClick={onClick} isPending={isPending}>
			{IconMap[provider]}
			{LabelMap[provider]}
		</SubmitButton>
	)
}
