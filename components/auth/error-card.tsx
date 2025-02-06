import { AuthCard } from './card'

export const ErrorCard: React.FC = () => {
	return (
		<AuthCard
			headerLabel={'something went wrong'}
			headerDescription={''}
			backButtonHref={'/auth/login'}
			backButtonLabel={'back to login'}
			showSocial={false}
		>
			...
		</AuthCard>
	)
}
