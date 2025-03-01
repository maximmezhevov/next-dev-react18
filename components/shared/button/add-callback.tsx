'use client'

import type { ButtonVariantProps } from '@/components/ui'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui'

interface Props extends ButtonVariantProps {
	href: string
	label?: string
	children?: React.ReactNode
	className?: string
}

export const ButtonAddCallback: React.FC<Props> = ({ href, label, children, ...props }) => {
	const pathname = usePathname()

	const callbackUrl = `callbackUrl=${pathname}`

	return (
		<Button asChild {...props}>
			<Link href={`${href}?${callbackUrl}`}>{label || children}</Link>
		</Button>
	)
}
