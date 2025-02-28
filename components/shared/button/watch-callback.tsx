'use client'

import type { ButtonVariantProps } from '@/components/ui'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { useWatchCallback } from '@/hooks'

interface Props extends ButtonVariantProps {
	href: string
	label?: string
	children?: React.ReactNode
	disabled?: boolean
	className?: string
}

export const ButtonWatchCallback: React.FC<Props> = ({ href, label, children, ...props }) => {
	const { callbackUrl } = useWatchCallback('?')

	return (
		<Button data-callback={Boolean(callbackUrl !== '')} asChild {...props}>
			<Link href={`${href}${callbackUrl}`}>{label || children}</Link>
		</Button>
	)
}
