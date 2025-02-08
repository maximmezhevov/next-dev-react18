import { Metadata } from 'next'
import { Suspense } from 'react'
import { VerificationForm } from '@/components/auth'

export const metadata: Metadata = {
	title: 'NDR18 | Верификация',
}

export default function Verification() {
	return (
		<Suspense fallback={null}>
			<VerificationForm />
		</Suspense>
	)
}
