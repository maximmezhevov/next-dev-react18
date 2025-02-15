import { Metadata } from 'next'
import { AuthCard, ResetForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

export default function ResetPage() {
	return (
		<AuthCard
			headerTitle='Сбросить пароль?'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<ResetForm />
		</AuthCard>
	)
}
