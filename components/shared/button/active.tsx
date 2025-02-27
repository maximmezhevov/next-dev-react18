'use client'

import { Button, ButtonVariantProps } from '@/components/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props extends Pick<ButtonVariantProps, 'size' | 'wrap'> {
	href: string
	children?: React.ReactNode
	label?: string
	className?: string
}

/**
 * ...{label || children}... children имеет приоритет
 */

export const ButtonActive: React.FC<Props> = ({ href, children, label, ...props }) => {
	const pathname = usePathname()
	return (
		<Button asChild variant={pathname === href ? 'default' : 'secondary'} {...props}>
			<Link href={href}>{label || children}</Link>
		</Button>
	)
}
