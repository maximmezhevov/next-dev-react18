'use client'

import type { ButtonVariantProps } from './button-variants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface Props extends ButtonVariantProps {
	children: React.ReactNode
	href: string
	className?: string
}

export const ButtonAddCallback: React.FC<Props> = ({ href, children, ...props }) => {
	const pathname = usePathname()
	const callbackUrl = `callbackUrl=${pathname}`
	return (
		<Button asChild {...props}>
			<Link href={`${href}?${callbackUrl}`}>{children}</Link>
		</Button>
	)
}
