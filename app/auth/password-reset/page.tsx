import { Metadata } from 'next'
import { Suspense } from 'react'
import { PasswordResetForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Сброс пароля',
}

export default function PassworReset() {
	return (
		<Suspense fallback={null}>
			<PasswordResetForm />
		</Suspense>
	)
}
