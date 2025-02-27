'use client'

import type { ButtonVariantProps } from '@/components/ui'
import { ButtonSubmit } from '@/components/shared'

import { useSignOutClient } from './use-client-button'

interface Props extends ButtonVariantProps {
	children?: React.ReactNode
	className?: string
}

export const SignOutClientButton: React.FC<Props> = ({ children, ...props }) => {
	const { handleSignOutClient, isPending } = useSignOutClient()

	return (
		<ButtonSubmit onClick={handleSignOutClient} disabled={isPending} {...props}>
			{children || 'sign-out (client no update() useSession)'}
		</ButtonSubmit>
	)
}
