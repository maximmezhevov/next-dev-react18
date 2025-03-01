'use client'

import { Button, ButtonVariantProps } from '@/components/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props extends Pick<ButtonVariantProps, 'size' | 'wrap'> {
	href: string
	label?: string
	children?: React.ReactNode
	className?: string
}

export const ButtonActive: React.FC<Props> = ({ href, label, children, ...props }) => {
	const pathname = usePathname()

	return (
		<Button asChild variant={pathname === href ? 'default' : 'secondary'} {...props}>
			<Link href={href}>{label || children}</Link>
		</Button>
	)
}
