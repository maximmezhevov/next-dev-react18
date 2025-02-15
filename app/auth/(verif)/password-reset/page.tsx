import { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthCard, PasswordResetForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

export default function PasswordResetPage() {
	return (
		<AuthCard
			headerTitle='Сброс пароля'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<Suspense fallback={null}>
				<PasswordResetForm />
			</Suspense>
		</AuthCard>
	)
}
