'use client'

import type { ButtonVariantProps } from '@/components/ui'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { OAuthAction } from '@/action/auth'
import { Button } from '@/components/ui'

interface Props extends ButtonVariantProps {
	provider: 'github'
	className?: string
}

export const OAuthServerActionButton: React.FC<Props> = ({ provider, ...props }) => {
	const [isPending, setIsPending] = useState(false)

	const searchParams = useSearchParams()
	const callbackUrl: string | undefined = searchParams.get('callbackUrl') ?? undefined

	const redirectUrl: string = callbackUrl || '/next-auth'

	const handleOAuthServerAction = async () => {
		setIsPending(true)

		try {
			await OAuthAction(provider, redirectUrl)
		} catch {
			console.log('Что-то пошло не так')
		} finally {
			// setIsPending(false) // умышленно закоментировал
		}
	}

	return (
		<Button onClick={handleOAuthServerAction} disabled={isPending} {...props}>
			{isPending && <Loader2 className='animate-spin' />}
			Sign-in with GitHub (server action)
		</Button>
	)
}
