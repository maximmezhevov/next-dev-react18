'use client'

import { Button } from '@/components/shadcn'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const HeaderCallback: React.FC<{ title: string }> = ({ title }) => {
	const searchParams = useSearchParams()
	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl ? getCallbackUrl : '/'
	return (
		<Link
			href={callbackUrl}
			title={callbackUrl}
			className='text-5xl font-black uppercase tracking-tight'
		>
			{title}
		</Link>
	)
}

export const ButtonCallback: React.FC<{
	callbackButtonLabel?: string
	backButtonHref?: string
}> = ({ callbackButtonLabel, backButtonHref }) => {
	const searchParams = useSearchParams()
	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined
	const callbackUrl: string = getCallbackUrl ? getCallbackUrl : '/'

	const link = `${backButtonHref}?callbackUrl=${callbackUrl}`

	return (
		<Button asChild variant='link' size='32' className='w-full'>
			<Link href={link} title={link}>
				{callbackButtonLabel}
			</Link>
		</Button>
	)
}
