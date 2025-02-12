import { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthCard, VerificationForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'Верификация',
}

const Verification = () => {
	return (
		<AuthCard
			headerLabel='Верификация'
			backButtonLabel='Вернуться к авторизации'
			backButtonHref='/auth/login'
		>
			<Suspense fallback={null}>
				<VerificationForm />
			</Suspense>
		</AuthCard>
	)
}

export default Verification
