import { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthCard, PasswordResetForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Сброс пароля',
}

const PasswordReset = () => {
	return (
		<AuthCard
			headerLabel='Сброс пароля'
			backButtonHref='/auth/login'
			backButtonLabel='Вернуться к авторизации'
		>
			<Suspense fallback={null}>
				<PasswordResetForm />
			</Suspense>
		</AuthCard>
	)
}

export default PasswordReset
