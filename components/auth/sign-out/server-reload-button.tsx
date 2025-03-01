'use client'

import type { ButtonVariantProps } from '@/components/ui'
import { ButtonSubmit } from '@/components/shared'

import { useSignOutServerReload } from './use-server-reload'

interface Props extends ButtonVariantProps {
	children?: React.ReactNode
	className?: string
}

export const SignOutServerReloadButton: React.FC<Props> = ({ children, ...props }) => {
	const { handleSignOutServerReload, isPending } = useSignOutServerReload()

	return (
		<ButtonSubmit onClick={handleSignOutServerReload} disabled={isPending} {...props}>
			{children || 'sign-out (server action window.location.reload())'}
		</ButtonSubmit>
	)
}
