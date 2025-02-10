import { Metadata } from 'next'
import { RegisterForms, AuthCard } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Регистрация',
}

export default function Register() {
	return (
		<AuthCard
			headerLabel='Регистрация'
			backButtonHref='/auth/login'
			backButtonLabel='Eсть учетная запись?'
		>
			<RegisterForms />
		</AuthCard>
	)
}
