import { Suspense } from 'react'
import { PasswordResetForm } from '@/components/auth'

export default function PassworReset() {
	return (
		<Suspense fallback={null}>
			<PasswordResetForm />
		</Suspense>
	)
}
