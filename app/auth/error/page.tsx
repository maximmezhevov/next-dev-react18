import { Metadata } from 'next'
import { AuthCard } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Что-то пошло не так',
}

export default function ErrorPage() {
	return (
		<AuthCard
			headerTitle='Что-то пошло не так'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		/>
	)
}
