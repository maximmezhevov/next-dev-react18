import { Metadata } from 'next'
import { AuthCard } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Что-то пошло не так',
}

const Error = () => {
	return (
		<AuthCard
			headerLabel='Что-то пошло не так'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		/>
	)
}

export default Error
