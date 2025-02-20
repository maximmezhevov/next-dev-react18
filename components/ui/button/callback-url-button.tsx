'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@/components/shadcn'

interface CallbackUrlButtonProps extends VariantProps<typeof buttonVariants> {
	children?: React.ReactNode
	label?: string
	href: string
	disabled?: boolean
	className?: string
}

export const WatchCallbackUrlButton: React.FC<CallbackUrlButtonProps> = ({
	children = null,
	label = null,
	disabled,
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
			<Link
				href={`${href}${callbackUrl}`}
				aria-disabled={disabled}
				className={disabled ? 'pointer-events-none opacity-50' : ''}
				onClick={(e) => {
					if (disabled) {
						e.preventDefault()
					}
				}}
			>
				{label || children}
			</Link>
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
