'use client'

import type { ButtonVariantProps } from '@/components/ui'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { useCallbackUrl } from '@/hooks'

interface Props extends ButtonVariantProps {
	label?: string
	children?: React.ReactNode
	className?: string
}

export const ButtonCallback: React.FC<Props> = ({ label, children, ...props }) => {
	const { callback } = useCallbackUrl()

	if (!callback) {
		return null
	}

	return (
		<Button asChild {...props}>
			<Link href={`${callback}`}>{label || children}</Link>
		</Button>
	)
}
