'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui'

import { type ButtonVariantProps } from './button-variants'
import React from 'react'

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
