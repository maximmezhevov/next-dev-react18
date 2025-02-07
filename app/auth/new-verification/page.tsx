import { NewVerificationForm } from '@/components/auth'
import { Suspense } from 'react'

export default function NewVerification() {
	return (
		<Suspense fallback={null}>
			<NewVerificationForm />
		</Suspense>
	)
}
