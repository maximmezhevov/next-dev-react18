import { Metadata } from 'next'
import { AuthCard, ResetForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

const Reset = () => {
	return (
		<AuthCard
			headerLabel='Сбросить пароль?'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<ResetForm />
		</AuthCard>
	)
}

export default Reset
