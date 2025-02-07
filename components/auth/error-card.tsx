import { AuthCard } from './card'

export const ErrorCard: React.FC = () => {
	return (
		<AuthCard
			headerLabel={'Что-то пошло не так'} // Something went wrong
			backButtonHref={'/auth/login'}
			backButtonLabel={'Вернуться к авторизации'} // Back to login
		/>
	)
}
