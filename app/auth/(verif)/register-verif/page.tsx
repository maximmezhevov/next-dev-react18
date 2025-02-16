import { Metadata } from 'next'
import { AuthCard, RegisterForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Регистрация с email верификацией',
}

export default function RegisterVerifPage() {
	return (
		<AuthCard
			headerTitle='Регистрация'
			backButtonHref='/auth/login'
			backButtonLabel='Eсть учетная запись?'
		>
			<RegisterForm />
		</AuthCard>
	)
}
