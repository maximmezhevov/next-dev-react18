import { VerificationForm } from '@/components/auth'
import { Suspense } from 'react'

export default function Verification() {
	return (
		<Suspense fallback={null}>
			<VerificationForm />
		</Suspense>
	)
}
