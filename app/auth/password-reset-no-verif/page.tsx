import { Metadata } from 'next'
import { AuthCard, PasswordResetNoVerifForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

const PassworResetNoVerif = () => {
	return (
		<AuthCard
			headerLabel='Сброс пароля'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<PasswordResetNoVerifForm />
		</AuthCard>
	)
}

export default PassworResetNoVerif
