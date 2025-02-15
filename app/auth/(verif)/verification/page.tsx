import { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthCard, Verification } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Верификация',
}

export default function VerificationPage() {
	return (
		<AuthCard
			headerTitle='Верификация'
			backButtonLabel='Вернуться к авторизации'
			backButtonHref='/auth/login'
		>
			<Suspense fallback={null}>
				<Verification />
			</Suspense>
		</AuthCard>
	)
}
