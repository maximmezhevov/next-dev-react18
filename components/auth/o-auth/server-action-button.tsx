'use client'

import type { ButtonVariantProps } from '@/components/ui'
import { FaGithub } from 'react-icons/fa6'
import { ButtonSubmit } from '@/components/ui'
import { useOAuthServerAction } from './use-server-action'

const iconMap = {
	github: <FaGithub size={16} className='shrink-0' />,
} as const
export type Provider = keyof typeof iconMap

const providerMap = {
	github: 'GitHub',
}

interface Props extends ButtonVariantProps {
	provider: Provider
	className?: string
}

export const OAuthServerActionButton: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	provider,
	...props
}) => {
	const { handleOAuthServerAction, isPending } = useOAuthServerAction(provider)

	return (
		<ButtonSubmit onClick={handleOAuthServerAction} disabled={isPending} {...props}>
			{iconMap[provider]}
			{children || `Sign in with ${providerMap[provider]} (server action)`}
		</ButtonSubmit>
	)
}
