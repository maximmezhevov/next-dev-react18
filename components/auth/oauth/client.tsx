'use client'

import type { AvailableProviders } from '@/@types'
import { useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { SubmitButton } from '@/components/ui'
import { IconMap, LabelMap } from './constants'

export const OAuthClient: React.FC<{
	provider: AvailableProviders
	redirectTo?: string
}> = ({ provider, redirectTo = '/dev/next-auth' }) => {
	const [isPending, startTransition] = useTransition()

	const onClick = async () => {
		startTransition(() => {
			signIn(provider, { redirectTo })
		})
	}

	return (
		<SubmitButton onClick={onClick} isPending={isPending}>
			{IconMap[provider]}
			{LabelMap[provider]}
		</SubmitButton>
	)
}
