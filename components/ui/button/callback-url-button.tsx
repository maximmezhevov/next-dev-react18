'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@/components/shadcn'

interface CallbackUrlButtonProps extends VariantProps<typeof buttonVariants> {
	children?: React.ReactNode
	label?: string
	href: string
	className?: string
}

export const WatchCallbackUrlButton: React.FC<CallbackUrlButtonProps> = ({
	children = null,
	label = null,
	href,
	...props
}) => {
	const searchParams = useSearchParams()

	const getCallbackUrl: string | undefined =
		searchParams.get('callbackUrl') ?? undefined

	const callbackUrl: string = getCallbackUrl
		? `?callbackUrl=${getCallbackUrl}`
		: ''

	return (
		<Button asChild {...props}>
			<Link href={`${href}${callbackUrl}`}>{label || children}</Link>
		</Button>
	)
}

export const AddCallbackUrlButton: React.FC<CallbackUrlButtonProps> = ({
	children = null,
	label = null,
	href,
	...props
}) => {
	const pathname = usePathname()
	return (
		<Button asChild {...props}>
			<Link href={`${href}?callbackUrl=${pathname}`}>{label || children}</Link>
		</Button>
	)
}
