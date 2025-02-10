import { Metadata } from 'next'
import { LoginForms, Social, AuthCard } from '@/components/auth'
import { NamedSeparator } from '@/components/ui'

export const metadata: Metadata = {
	title: 'NDR18 | Авторизация',
}

export default function Login() {
	return (
		<AuthCard
			headerBigLabel='NRD18'
			headerDescription='Добро пожаловать!'
			backButtonHref='/auth/register'
			backButtonLabel='Нет учетной записи?'
			classNameContent='space-y-6'
		>
			<Social />
			<NamedSeparator label='или с учетной записью' />
			<LoginForms />
		</AuthCard>
	)
}
