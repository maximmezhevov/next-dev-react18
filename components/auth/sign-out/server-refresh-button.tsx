'use client'

import type { ButtonVariantProps } from '@/components/ui'
import { ButtonSubmit } from '@/components/shared'

import { useSignOutServerRefresh } from './use-server-refresh'

interface Props extends ButtonVariantProps {
	children?: React.ReactNode
	className?: string
}

export const SignOutServerRefreshButton: React.FC<Props> = ({ children, ...props }) => {
	const { handleSignOutServerRefresh, isPending } = useSignOutServerRefresh()

	return (
		<ButtonSubmit onClick={handleSignOutServerRefresh} disabled={isPending} {...props}>
			{children || 'sign-out (server action router.refresh())'}
		</ButtonSubmit>
	)
}
